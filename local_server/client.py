import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('connection established')

@sio.event
def callback_server2client(data):
    print('message received with ', data)
    # sio.emit('callaback_client2server', {'response': 'my response'})

@sio.event
def disconnect():
    print('disconnected from server')


    # try:
# sio.connect('http://localhost:8080')
sio.connect('https://mochiwsockets.appspot.com/')
    # except:
        # print("An exception occurred")
    
# x = 1
# while True:
#     x = x + 1

sio.wait()