#include "rtmp_connector.h"

#include <iostream>

#include "../lib/librtmp/srs_librtmp.h"

srs_rtmp_t start_rtmp_connection(const char* rtmp_url, double fps) {
    
    // connect rtmp context
    srs_rtmp_t rtmp = srs_rtmp_create(rtmp_url);

    if (srs_rtmp_handshake(rtmp) != 0) {
        srs_human_trace("simple handshake failed.");
        exit(-1);
    }
    srs_human_trace("simple handshake success");


    if (srs_rtmp_connect_app(rtmp) != 0) {
        srs_human_trace("connect vhost/app failed.");
        exit(-1);
    }
    srs_human_trace("connect vhost/app success");

    if (srs_rtmp_publish_stream(rtmp) != 0) {
        srs_human_trace("publish stream failed.");
        exit(-1);
    }
    
    srs_human_trace("publish stream success");
    return rtmp;
};

int stop_rtmp_connection(srs_rtmp_t rtmp) {
    srs_rtmp_destroy(rtmp);
};