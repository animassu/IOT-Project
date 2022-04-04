from flask import Flask
from flask_mqtt import Mqtt
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['MQTT_BROKER_URL'] = '0.0.0.0'
app.config['MQTT_BROKER_PORT'] = 1884
app.config['MQTT_REFRESH_TIME'] = 1.0  # refresh time in seconds
mqtt = Mqtt(app)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

example_list = []

@app.route('/')
def index():
    return jsonify(example_list) 

@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe('test')

@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    example_list.append(data)