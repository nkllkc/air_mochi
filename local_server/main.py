import socketio
import logging
import event_type
import base64
import getpass
import os
import socket
import sys
import traceback
from paramiko.py3compat import input

import paramiko

# Set the appropriate log level.
logging.basicConfig(level=logging.DEBUG)

# Set the appropriate port and baudrate.
# mouseController = mouse_controller.MouseController("/dev/ttyUSB2", 115200)
# 10.25.24.252
sio = socketio.Client()

client = ''

@sio.event
def connect():
    logging.info('Connection with GCP is established. Using WebSockets.')

@sio.event
def disconnect():
    logging.error('Disconnected from the GCP GAE.')

@sio.event
def event_server2client(data):
    event = event_type.EventType(data)
    logging.debug("x: %s, y: %s", event._x, event._y)
    
    client.exec_command("ls")

    # logging.debug("Width: %s, height: %s, x: %s, y: %s, type: %s", event._x, event.height, event.x, event.y, event.type)
    # mouseController.event(event.width, event.height, event.x, event.y, event.type)

if __name__== "__main__":
    # setup logging
    paramiko.util.log_to_file("demo_simple.log")
    # Paramiko client configuration
    UseGSSAPI = (
        paramiko.GSS_AUTH_AVAILABLE
    )  # enable "gssapi-with-mic" authentication, if supported by your python installation
    DoGSSAPIKeyExchange = (
        paramiko.GSS_AUTH_AVAILABLE
    )  # enable "gssapi-kex" key exchange, if supported by your python installation
    # UseGSSAPI = False
    # DoGSSAPIKeyExchange = False
    port = 22

    # get hostname
    username = ""
    if len(sys.argv) > 1:
        hostname = sys.argv[1]
        if hostname.find("@") >= 0:
            username, hostname = hostname.split("@")
    else:
        hostname = input("Hostname: ")
    if len(hostname) == 0:
        print("*** Hostname required.")
        sys.exit(1)

    if hostname.find(":") >= 0:
        hostname, portstr = hostname.split(":")
        port = int(portstr)


    # get username
    if username == "":
        default_username = getpass.getuser()
        username = input("Username [%s]: " % default_username)
        if len(username) == 0:
            username = default_username
    if not UseGSSAPI and not DoGSSAPIKeyExchange:
        password = getpass.getpass("Password for %s@%s: " % (username, hostname))


    # now, connect and use paramiko Client to negotiate SSH2 across the connection
    try:
        client = paramiko.SSHClient()
        client.load_system_host_keys()
        client.set_missing_host_key_policy(paramiko.WarningPolicy())
        print("*** Connecting...")
        if not UseGSSAPI and not DoGSSAPIKeyExchange:
            client.connect(hostname, port, username, password)
        else:
            try:
                client.connect(
                    hostname,
                    port,
                    username,
                    gss_auth=UseGSSAPI,
                    gss_kex=DoGSSAPIKeyExchange,
                )
            except Exception:
                # traceback.print_exc()
                password = getpass.getpass(
                    "Password for %s@%s: " % (username, hostname)
                )
                client.connect(hostname, port, username, password)

        client.exec_command("ls")

        sio.connect('http://localhost:8080/')
        sio.wait()
        
        client.close()

    except Exception as e:
        print("*** Caught exception: %s: %s" % (e.__class__, e))
        traceback.print_exc()
        try:
            client.close()
        except:
            pass
        sys.exit(1)
