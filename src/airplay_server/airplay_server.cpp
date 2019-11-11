#include "airplay_server.h"

#include <stddef.h>
#include <cstring>
#include <string>
#include <vector>

#include "../lib/airplay/stream.h"
#include "../lib/airplay/raop.h"
#include "../lib/airplay/dnssd.h"
#include "../airplay_server/airplay_callbacks.h"

int start_airplay_server(
        raop_t *raop,
        dnssd_t *dnssd,
        std::vector<char> hw_addr, 
        void (*airplay_connection_established)(void *, uint64_t),
        void (*audio_process)(void *, raop_ntp_t *, aac_decode_struct *),
        void (*video_process)(void *, raop_ntp_t *, h264_decode_struct *),
        void (*audio_flush)(void *),
        void (*video_flush)(void *),
        void (*audio_set_volume)(void *, float),
        void (*log_callback)(void *, int, const char *),
        std::string name, 
        bool show_background,
        bool low_latency, 
        bool debug_log) {
    raop_callbacks_t raop_cbs;
    memset(&raop_cbs, 0, sizeof(raop_cbs));
    raop_cbs.audio_process = audio_process;
    raop_cbs.video_process = video_process;
    raop_cbs.audio_flush = audio_flush;
    raop_cbs.video_flush = video_flush;
    raop_cbs.audio_set_volume = audio_set_volume;
    raop_cbs.airplay_connection_established = airplay_connection_established;

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

int stop_airplay_server(raop_t *raop, dnssd_t *dnssd) {
    raop_destroy(raop);
    
    dnssd_unregister_raop(dnssd);
    dnssd_unregister_airplay(dnssd);
    
    return 0;
}
