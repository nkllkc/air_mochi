import mouse_controller
import time
import logging

logging.basicConfig(level=logging.DEBUG)

mouseController = mouse_controller.MouseController("/dev/ttyUSB2", 115200)

# Test 330x720.
# s
# TODO(saghar): Test other screen sizes.
# Test OTHER
# time.sleep(2)
# mouseController.event(720, 330, 360, 165, "DOWN")
# time.sleep(3)
# mouseController.event(720, 330, 360 / 2, 165 / 2, "UP")
# time.sleep(3)
# mouseController.event(720, 330, 360 + 360 / 2, 165 + 165 / 2, "UP")

# Test TAP.
time.sleep(2)
# This is a TAP.
mouseController.event(720, 330, 360, 165, "DOWN")
mouseController.event(720, 330, 360, 165, "UP")
# This is a TAP.
time.sleep(3)
mouseController.event(720, 330, 360 / 2 - 50, 165 / 2 - 30, "DOWN")
mouseController.event(720, 330, 360 / 2 - 50, 165 / 2 - 30, "UP")
