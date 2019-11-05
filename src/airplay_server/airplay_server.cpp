#include "airplay_server.h"

#include <stddef.h>
#include <cstring>
#include <string>
#include <vector>

#include "../lib/airplay/stream.h"
#include "../lib/airplay/raop.h"


int start_server(
        raop_t *raop,
        dnssd_t *dnssd,
        void (*audio_process)(void *, raop_ntp_t *, aac_decode_struct *),
        void (*video_process)(void *, raop_ntp_t *, h264_decode_struct *),
        void (*audio_flush)(void *),
        void (*video_flush)(void *),
        void (*audio_set_volume)(void *, float),
        void (*log_callback)(void *, int, const char *),
        std::vector<char> hw_addr = DEFAULT_HW_ADDRESS, 
        std::string name = DEFAULT_NAME, 
        bool show_background = DEFAULT_SHOW_BACKGROUND,
        bool low_latency = DEFAULT_LOW_LATENCY, 
        bool debug_log = DEFAULT_DEBUG_LOG) {
    raop_callbacks_t raop_cbs;
    memset(&raop_cbs, 0, sizeof(raop_cbs));
    raop_cbs.audio_process = audio_process;
    raop_cbs.video_process = video_process;
    raop_cbs.audio_flush = audio_flush;
    raop_cbs.video_flush = video_flush;
    raop_cbs.audio_set_volume = audio_set_volume;

    raop = raop_init(10, &raop_cbs);
    if (raop == NULL) {
        printf("Error initializing raop!");
        return -1;
    }

    raop_set_log_callback(raop, log_callback, NULL);
    raop_set_log_level(raop, debug_log ? RAOP_LOG_DEBUG : LOGGER_INFO);

    logger_t *render_logger = logger_init();
    logger_set_callback(render_logger, log_callback, NULL);
    logger_set_level(render_logger, debug_log ? LOGGER_DEBUG : LOGGER_INFO);

    unsigned short port = 0;
    raop_start(raop, &port);
    raop_set_port(raop, port);

    int error;
    dnssd = dnssd_init(name.c_str(), strlen(name.c_str()), hw_addr.data(), hw_addr.size(), &error);
    if (error) {
        printf("Could not initialize dnssd library!");
        return -2;
    }

    raop_set_dnssd(raop, dnssd);
    
    dnssd_register_raop(dnssd, port);
    dnssd_register_airplay(dnssd, port + 1);

    return 0;
}

int stop_server(raop_t *raop, dnssd_t *dnssd) {
    raop_destroy(raop);
    
    dnssd_unregister_raop(dnssd);
    dnssd_unregister_airplay(dnssd);
    
    return 0;
}
