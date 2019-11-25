import json

class EventType:
    # This object will contain the following type declared in Node.js
    # var msg_json = {
    #     type: "DOWN" | "UP",
    #     time: date.getTime(),
    #     height: height,
    #     width: width,
    #     x: x,
    #     y: y, 
    # }

    def __init__(self, data):
	    self.__dict__ = json.loads(data)


if __name__== "__main__":
    ev = event_type('{"name":"mkyong.com","messages":["msg 1","msg 2","msg 3"],"age":100}')
    print(ev)
    print(ev.__dict__)
    print(ev.name)
    print(ev.messages)