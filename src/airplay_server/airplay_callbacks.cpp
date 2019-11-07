#include "airplay_callbacks.h"

#include <stdio.h>

void audio_process(void * cls, raop_ntp_t *ntp, aac_decode_struct *aac) {
    // Not yet supported.
}

void video_process(void *cls, raop_ntp_t *ntp, h264_decode_struct *h264) {
    printf("-");
    // Not yet supported.
}

void audio_flush(void *cls) {
    // Not yet supported.
}

void video_flush(void *cls) {
    // Not yet supported.
}

void audio_set_volume(void *cls, float volume) {
    // Not yet supported.
}

void log_callback(void *cls, int level, const char *msg) {
    printf("%s\n", msg);
}
