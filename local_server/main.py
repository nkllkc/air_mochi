import socketio
import logging
import event_type
import mouse_controller 

# Set the appropriate log level.
logging.basicConfig(level=logging.DEBUG)

# Set the appropriate port and baudrate.
mouseController = mouse_controller.MouseController("/dev/ttyUSB2", 115200)

sio = socketio.Client()

@sio.event
def connect():
    logging.info('Connection with GCP is established. Using WebSockets.')

@sio.event
def disconnect():
    logging.error('Disconnected from the GCP GAE.')

@sio.event
def event_server2client(data):
    event = event_type.EventType(data)
    logging.debug("Width: %s, height: %s, x: %s, y: %s, type: %s", event.width, event.height, event.x, event.y, event.type)
    mouseController.event(event.width, event.height, event.x, event.y, event.type)

if __name__== "__main__":
    sio.connect('https://mochiwsockets.appspot.com/')
    sio.wait()
