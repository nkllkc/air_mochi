#ifndef _RTMP_CONNECTOR_
#define _RTMP_CONNECTOR_

#include "../lib/librtmp/srs_librtmp.h"

#define AAA 123

srs_rtmp_t start_rtmp_connection(const char* rtmp_url, double fps);
int stop_rtmp_connection(srs_rtmp_t rtmp);

#endif