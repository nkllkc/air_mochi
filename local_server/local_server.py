import socketio
import serial
import requests
import ast
from flask import Flask, request, jsonify
import json


sio = socketio.Client()
curr_cursor_place = {'curr_x': 0, 'curr_y': 0}
ser = serial.Serial()
ser.baudrate = 115200
ser.port = '/dev/cu.SLAB_USBtoUART'
ser.open()

def update_current_cursor_place(new_x, new_y):
    curr_cursor_place['curr_x'] = new_x
    curr_cursor_place['curr_y'] = new_y

def find_movement_values(new_x, new_y, height, width):
    x_movement = int((new_x - curr_cursor_place['curr_x'])*4.23*(width/330))
    y_movement = int((new_y - curr_cursor_place['curr_y'])*2.05*(height/720))
    x_values = []
    y_values = []
    if x_movement >= 0:
        while x_movement > 127:
            x_values.append(127)
            x_movement = x_movement - 127
        x_values.append(x_movement)
    else:
        while x_movement < -128:
            x_values.append(128)
            x_movement = x_movement + 128
        x_values.append(x_movement + 256)
    if y_movement >= 0:
        while y_movement > 127:
            y_values.append(127)
            y_movement = y_movement - 127
        y_values.append(y_movement)
    else:
        while y_movement < -128:
            y_values.append(128)
            y_movement = y_movement + 128
        y_values.append(y_movement + 256)
    while len(x_values) > len(y_values):
        y_values.append(0)
    while len(x_values) < len(y_values):
        x_values.append(0)
    return x_values, y_values

@sio.event
def connect():
    print('connection established')

@sio.event
def callback_server2client(data):
    print('message received with ', data)
    dimensions = data.split('$')[0]
    cursor_place = data.split('$')[1]
    print(cursor_place)
    x = (cursor_place.split('&')[0]).split('=')[1]
    y = (cursor_place.split('&')[1]).split('=')[1]
    h = (dimensions.split('&')[0]).split('=')[1]
    w = (dimensions.split('&')[1]).split('=')[1]
    input_x = int(float(x))
    input_y = int(float(y))
    print(input_x)
    print(input_y)
    x_movement_values, y_movement_values = find_movement_values(input_x, input_y, h, w)
    print(x_movement_values)
    print(y_movement_values)
    update_current_cursor_place(input_x, input_y)
    print(curr_cursor_place)
    for i in range(0, len(x_movement_values)):
        if i == (len(x_movement_values) - 1):
            values = bytearray([x_movement_values[i], y_movement_values[i], 1])
            ser.write(values)
            values = bytearray([0, 0, 0])
            ser.write(values)
        else:
            values = bytearray([x_movement_values[i], y_movement_values[i], 0])
            ser.write(values)
        print("Mouse event sent")


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