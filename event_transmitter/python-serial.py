import serial
import requests
import ast
from flask import Flask, request, jsonify
import json

app = Flask(__name__)


@app.route('/data', methods=['POST'])
def send_mouse_event():
    rf = request.form
    print(rf)
    for key in rf.keys():
        cursor_place = ast.literal_eval(key)
    input_x = int(cursor_place['x_value'])
    input_y = int(cursor_place['y_value'])
    x_movement_values, y_movement_values = find_movement_values(input_x, input_y)
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
    return "Mouse event sent"


def find_movement_values(new_x, new_y):
    x_movement = new_x - curr_cursor_place['curr_x']
    y_movement = new_y - curr_cursor_place['curr_y']
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


def update_current_cursor_place(new_x, new_y):
    curr_cursor_place['curr_x'] = new_x
    curr_cursor_place['curr_y'] = new_y


if __name__ == "__main__":
    ser = serial.Serial()
    ser.baudrate = 115200
    ser.port = '/dev/cu.SLAB_USBtoUART'
    ser.open()
    curr_cursor_place = {'curr_x': 0, 'curr_y': 0}
    app.run(host='0.0.0.0', port=5000, debug=False)
    # app.run()
    ser.close()
