function clickEvent() {
    console.log("Clicked()")

    var msg_json = {
        _b: 1,
        _x: 0,
        _y: 0,
        _w: 0
    }
    // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
    var msg = JSON.stringify(msg_json);
    console.log(msg);
    socket.emit('event_console2server', msg);
}

function trackingEvent(e) {
    var x = e.movementX
    var y = e.movementY

    if (Math.sqrt(x * x + y * y) < 3) {
        return
    }

    var msg_json = {
        _b: 0,
        _x: e.movementX,
        _y: e.movementY,
        _w: 0
    }

    // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
    var msg = JSON.stringify(msg_json);
    console.log(msg);
    socket.emit('event_console2server', msg);
}

function keyboardPressed(event) {
    // User has pressed 'h', meaning that we should go to home screen.
    if (event.key == 'h') {
        console.log("Homescreen!")
        var msg_json = {
            _b: 2,
            _x: 0,
            _y: 0,
            _w: 0
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Screenshot.
    if (event.key == 's') {
        console.log("Screenshot!")
        var msg_json = {
            _b: 4,
            _x: 0,
            _y: 0,
            _w: 0
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Notifications.
    if (event.key == 'n') {
        console.log("Notifications!")
        var msg_json = {
            _b: 8,
            _x: 0,
            _y: 0,
            _w: 0
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Control Center.
    if (event.key == 'c') {
        console.log("Control Center!")
        var msg_json = {
            _b: 16,
            _x: 0,
            _y: 0,
            _w: 0
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Dock.
    if (event.key == 'd') {
        console.log("Dock!")
        var msg_json = {
            _b: 32,
            _x: 0,
            _y: 0,
            _w: 0
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Scrool Down!
    if (event.key == 'ArrowDown') {
        console.log("Screenshot!")
        var msg_json = {
            _b: 0,
            _x: 0,
            _y: 0,
            _w: -1
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

    // Scrool Up!
    if (event.key == 'ArrowUp') {
        console.log("Screenshot!")
        var msg_json = {
            _b: 0,
            _x: 0,
            _y: 0,
            _w: 1
        }
        // console.log("X position: " + msg_json._x + ", Y position: " + msg_json._y);
        var msg = JSON.stringify(msg_json);
        console.log(msg);
        socket.emit('event_console2server', msg);
    }

}

function sendMessage(msg_json) {
    var msg = JSON.stringify(msg_json);
    console.log(msg);
    socket.emit('event_console2server', msg);
}