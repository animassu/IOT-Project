from flask import Flask
from flask_mqtt import Mqtt
from flask import jsonify
from flask_cors import CORS
import datetime

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

hour_counter = 1
@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        store=message.payload.decode()[10:15],
        value=int(message.payload.decode()[16:len(message.payload.decode())-1]),
        time=store_data[len(store_data)-1]['time'] +  datetime.timedelta(hours=1)
    )
    print("Appending")
    store_data.append(data)
