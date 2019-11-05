#ifndef _AIRPLAY_SERVER_
#define _AIRPLAY_SERVER_

#include <string>
#include <vector>

#include "../lib/airplay/stream.h"
#include "../lib/airplay/raop.h"

#define DEFAULT_HW_ADDRESS { (char) 0x48, (char) 0x5d, (char) 0x60, (char) 0x7c, (char) 0xee, (char) 0x22 }
#define DEFAULT_NAME "AirMochi"
#define DEFAULT_SHOW_BACKGROUND true
#define DEFAULT_AUDIO_DEVICE AUDIO_DEVICE_HDMI
#define DEFAULT_LOW_LATENCY true
#define DEFAULT_DEBUG_LOG true

int start_server(
        raop_t *raop,
        dnssd_t *dnssd,
        void (*audio_process)(void *, raop_ntp_t *, aac_decode_struct *),
        void (*video_process)(void *, raop_ntp_t *, h264_decode_struct *),
        void (*audio_flush)(void *),
        void (*video_flush)(void *),
        void (*audio_set_volume)(void *, float),
        void (*log_callback)(void *, int, const char *),
        std::vector<char> hw_addr, 
        std::string name, 
        bool show_background,
        bool low_latency, 
        bool debug_log);

#endif
