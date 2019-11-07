#ifndef _AIRPLAY_SERVER_
#define _AIRPLAY_SERVER_

#include <string>
#include <vector>

#include "../lib/airplay/stream.h"
#include "../lib/airplay/raop.h"
#include "../airplay_server/airplay_callbacks.h"

#define DEFAULT_HW_ADDRESS { (char) 0x48, (char) 0x5d, (char) 0x60, (char) 0x7c, (char) 0xee, (char) 0x22 }
#define DEFAULT_NAME "AirMochi"
#define DEFAULT_SHOW_BACKGROUND true
#define DEFAULT_AUDIO_DEVICE AUDIO_DEVICE_HDMI
#define DEFAULT_LOW_LATENCY true
#define DEFAULT_DEBUG_LOG true

int start_airplay_server(
        raop_t *raop,
        dnssd_t *dnssd,
        std::vector<char> hw_addr, 
        void (*audio_process)(void *, raop_ntp_t *, aac_decode_struct *) = audio_process,
        void (*video_process)(void *, raop_ntp_t *, h264_decode_struct *) = video_process,
        void (*audio_flush)(void *) = audio_flush,
        void (*video_flush)(void *) = video_flush,
        void (*audio_set_volume)(void *, float) = audio_set_volume,
        void (*log_callback)(void *, int, const char *) = log_callback,
        std::string name = DEFAULT_NAME, 
        bool show_background = DEFAULT_SHOW_BACKGROUND,
        bool low_latency = DEFAULT_LOW_LATENCY, 
        bool debug_log = DEFAULT_DEBUG_LOG);

int stop_airplay_server(raop_t *raop, dnssd_t *dnssd);

#endif
