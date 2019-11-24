import serial
import logging
import time 

class MouseController:

    # TODO(nikola, saghar): Those are width and height that mouse emulator sees
    #                       for iPhone XS Max. Measure more devices (e.g. 
    #                       iPhone 11 XL Pro, iPad 2 Pro, etc.).
    WIDTH = 1475
    HEIGHT = 1475

    # Max size of a step. This is limitation due to byte size of element to be 
    # transfered to ESP32.
    STEP = 127

    def __init__(self, port, baudrate):
        logging.info("Opening serial port: %s, baudrate: %s", port, baudrate)
        self.ser = serial.Serial()
        self.ser.baudrate = baudrate
        self.ser.port = port
        self.ser.open()
        self.calibrate()
        
    def calibrate(self):
        logging.debug("Calibrating to [0,0].")
        self.curr_x = 0
        self.curr_y = 0
        for _ in range(12):
            self.ser.write(bytearray([128, 128, 0]))
    
    def event(self, width, height, x, y, type):
        a = (x * MouseController.WIDTH) / width
        b = (y * MouseController.HEIGHT) / height
        self.__event(int(a), int(b), type)

    def __event(self, x, y, type):
        if 'UP' == type:
            event_type = 0
        elif 'DOWN' == type:
            event_type = 1
        else:
            # TODO(nikola, saghar): Add support for right click. Declare what is 
            #                       the right click in iOS device settings. 
            logging.error("Unrecognized event type:")
            return

        x_num_of_steps = abs(x - self.curr_x) / MouseController.STEP
        x_pad = abs(x - self.curr_x) % MouseController.STEP
        x_step_dir = 127
        if x < self.curr_x:
            x_step_dir = 128
            x_pad = 255 - x_pad 

        y_num_of_steps = abs(y - self.curr_y) / MouseController.STEP
        y_pad = abs(y - self.curr_y) % MouseController.STEP
        y_step_dir = 127
        if y < self.curr_y:
            y_step_dir = 128
            y_pad = 255 - y_pad

        # Make incremental steps of size STEP. Event type is 0 (no buttons 
        # are pressed).
        while x_num_of_steps > 0 and y_num_of_steps > 0:
            x_move = 0 if x_num_of_steps <= 0 else x_step_dir
            y_move = 0 if y_num_of_steps <= 0 else y_step_dir
            self.ser.write(bytearray([x_move, y_move, 0]))
            x_num_of_steps = x_num_of_steps - 1
            y_num_of_steps = y_num_of_steps - 1

        # Make final step and generate final event.
        self.ser.write(bytearray([x_pad, y_pad, 0]))
        time.sleep(.3)
        self.ser.write(bytearray([0, 0, event_type]))
        self.curr_x = x
        self.curr_y = y

if __name__== "__main__":
    mouseController = MouseController("/dev/ttyUSB2", 115200)