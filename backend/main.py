from flask import Flask
from flask_mqtt import Mqtt
from flask import jsonify
from flask_cors import CORS
import datetime
import psycopg2
import json

### MIGHT NEED TO CHECK DEPENDENCIES HERE; MIGHT BE COMPLCIATED CAN COMMENT OUT FIRST
from heatmappy import Heatmapper
from PIL import Image

app = Flask(__name__)
app.config['MQTT_BROKER_URL'] = '0.0.0.0'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds

### Configuration for the things network
# app.config['MQTT_BROKER_URL'] = 'au1.cloud.thethings.network'
# app.config['MQTT_BROKER_PORT'] = 1883
# app.config['MQTT_USERNAME'] = 'p1-05-mall-tracker@ttn'
# app.config['MQTT_PASSWORD'] = 'NNSXS.R6IEXJFZ53YFNSXIFDW33GWGB7QSUZ7F23TKWFQ.YSYYI4ESMDEONNMACH4OEMK2OWQUG76IRX2IQQHP2VYNSI7OHRAQ'

mqtt = Mqtt(app)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

def db():
    connection =  psycopg2.connect(
        dbname = "csc2006",
        user = 'postgres',
        password = 'cl0udplus!',
        host = '174.138.23.75',
        port = '5432'
    )
    connection.autocommit = True
    return connection

def query_db(query, args=(), one=False, type=None):
    cur = db().cursor()
    cur.execute(query, args)
    if (type == None):
        r = [dict((cur.description[i][0], value) \
                for i, value in enumerate(row)) for row in cur.fetchall()]
        cur.connection.close()
        return (r[0] if r else None) if one else r
    else:
        return

### Simulated ###
@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    # To removed here
    mqtt.subscribe('test')
    #mqtt.subscribe('#')

### TTN ###
# @mqtt.on_connect()
# def handle_connect(client, userdata, flags, rc):
#     # Subscribe to TTN MQTT Broker
#     mqtt.subscribe('v3/p1-05-mall-tracker@ttn/devices/eui-70b3d57ed004df25/up')


hour_counter = 1
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        store=message.payload.decode()[10:15],
        counter=int(message.payload.decode()[16:len(message.payload.decode())-1]),
    )

    query = query_db("""SELECT user_id, date, hour FROM foot_traffic f
                        INNER JOIN users u 
                        ON u.id = f.user_id
                        WHERE u.username = (%s)
                        ORDER BY f.id DESC LIMIT 1""", (data['store'],))
    cur = db().cursor()
    print(query[0]['date'])
    if int(query[0]['hour']) == 21:
        new_date = query[0]['date'] + datetime.timedelta(days=1)
        query_db('INSERT INTO foot_traffic (user_id, counter, date, hour) VALUES (%s, %s, %s, %s)',
        (query[0]['user_id'], data['counter'], new_date, 8), type='insert')
        db().commit()

        print("Added new Data; New Date")
    else:
        query_db('INSERT INTO foot_traffic (user_id, counter, date, hour) VALUES (%s, %s, %s, %s)',
        (query[0]['user_id'], data['counter'], query[0]['date'], int(query[0]['hour']) + 1), type='insert')
        db().commit()

        print("Added new Data")


@app.route('/data')
def getData():
    query = query_db("""SELECT * FROM foot_traffic WHERE user_id = 1 and date=(SELECT MAX(DATE) from foot_traffic WHERE user_id = 1)""")
    return jsonify(query)

@app.route('/last')
def getLast():
    query = query_db("SELECT * FROM foot_traffic WHERE user_id = 1 ORDER BY ID DESC LIMIT 1")
    return jsonify(query)

@app.route('/heatmap')
def getHeatMap():
    ### HEAT MAP LOGIC HERE ###
    print("RUNNING HEAP MAP")
    heatmap_pts = []
    first_store = 0
    query = query_db("""SELECT counter FROM foot_traffic f
                            INNER JOIN users u 
                            ON u.id = f.user_id
                            WHERE u.username = '01-55'
                            ORDER BY f.id DESC LIMIT 1""")
    first_store = int(query[0]['counter'])

    second_store = 0
    query = query_db("""SELECT counter FROM foot_traffic f
                            INNER JOIN users u 
                            ON u.id = f.user_id
                            WHERE u.username = '01-40'
                            ORDER BY f.id DESC LIMIT 1""")
    second_store = int(query[0]['counter'])
            

    if (first_store > 0 and first_store < 25):
        heatmap_pts = [(295, 900)]
    if (first_store >= 25 and first_store < 50):
        heatmap_pts = [(295, 900), (295, 899)]
    if (first_store >= 50):
        heatmap_pts = [(295, 900), (295, 899), (295, 898)]

    if (second_store > 0 and second_store < 25):
        heatmap_pts.append((643, 750))
    if (second_store >= 25 and second_store < 50):
        heatmap_pts.append((643, 750))
        heatmap_pts.append((643, 749))
    if (second_store >= 50):
        heatmap_pts.append((643, 750))
        heatmap_pts.append((643, 749))
        heatmap_pts.append((643, 748))

    heatmap_img_path = 'shopping-mall.jpg'
    heatmap_img = Image.open(heatmap_img_path)
    heatmapper = Heatmapper()
    heatmap = heatmapper.heatmap_on_img(heatmap_pts, heatmap_img)
    heatmap.save('../myapp/public/heatmap.png')

    print("Heatmap Point: ", heatmap_pts)
    print("Heatmap Complete")

    return "200"