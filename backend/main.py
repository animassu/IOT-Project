from flask import Flask
from flask_mqtt import Mqtt
from flask import jsonify
from flask_cors import CORS
import datetime
from heatmappy import Heatmapper
from PIL import Image

app = Flask(__name__)
app.config['MQTT_BROKER_URL'] = '0.0.0.0'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds

### Configuration for the things network
#app.config['MQTT_BROKER_URL'] = 'au1.cloud.thethings.network'
#app.config['MQTT_BROKER_PORT'] = 1883
#app.config['MQTT_USERNAME'] = 'p1-05-mall-tracker@ttn'
#app.config['MQTT_PASSWORD'] = 'NNSXS.R6IEXJFZ53YFNSXIFDW33GWGB7QSUZ7F23TKWFQ.YSYYI4ESMDEONNMACH4OEMK2OWQUG76IRX2IQQHP2VYNSI7OHRAQ'

mqtt = Mqtt(app)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

store_data = [
    {'topic': 'test', 'store': "01-55", 'value' : 60, 'time': datetime.datetime(2020, 5, 17).replace(hour=8)},
    {'topic': 'test', 'store': "01-55", 'value' : 20, 'time': datetime.datetime(2020, 5, 17).replace(hour=9)},
    {'topic': 'test', 'store': "01-55", 'value' : 40, 'time': datetime.datetime(2020, 5, 17).replace(hour=10)},
    {'topic': 'test', 'store': "01-55", 'value' : 80, 'time': datetime.datetime(2020, 5, 17).replace(hour=11)},
    {'topic': 'test', 'store': "01-55", 'value' : 10, 'time': datetime.datetime(2020, 5, 17).replace(hour=12)},
]

@app.route('/data')
def getData():
    return jsonify(store_data) 

@app.route('/last')
def getLast():
    if len(store_data) == 0:
        return "No Data"
    else:  
        return jsonify(store_data[len(store_data)-1]) 

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    # To removed here
    mqtt.subscribe('test')
    #mqtt.subscribe('#')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    heatmap_pts = []
    store = message.payload.decode()[10:15]
    value = int(message.payload.decode()[16:len(message.payload.decode())-1])

    data = dict(
        topic=message.topic,
        store=store,
        value=value,
        time=store_data[len(store_data)-1]['time'] + datetime.timedelta(hours=1)
    )
    store_data.append(data)

    first_store = 0
    for i in range(len(store_data)-1, 0, -1):
        if store_data[i]['store'] == "01-55":
            first_store = store_data[i]['value'] 
            break

    second_store = 0
    for i in range(len(store_data)-1, 0, -1):
        if store_data[i]['store'] == "01-40":
            second_store = store_data[i]['value'] 
            break

    print("First", first_store)
    print("Second", second_store)
            

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