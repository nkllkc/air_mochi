#include "lib/librtmp/srs_librtmp.h"
#include "util/rtmp_connector.h"

#include <iostream>
#include <stdio.h>

#define DEFAULT_NAME "RPiPlay"
#define DEFAULT_SHOW_BACKGROUND true
#define DEFAULT_AUDIO_DEVICE AUDIO_DEVICE_HDMI
#define DEFAULT_LOW_LATENCY false
#define DEFAULT_DEBUG_LOG false
#define DEFAULT_HW_ADDRESS { (char) 0x48, (char) 0x5d, (char) 0x60, (char) 0x7c, (char) 0xee, (char) 0x22 }

static srs_rtmp_t t;

int main(int argv, const char** args) {
    int x = AAA;
    printf("%d\n", x);
    start_rtmp_connection("rtmp://127.0.0.1:1935/live/mystream", 125.0);
    // std::cin >> x;
    stop_rtmp_connection(t);
}