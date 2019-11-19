#ifndef _AIRPLAY_CALLBACKS_
#define _AIRPLAY_CALLBACKS_

#include "../lib/airplay/stream.h"
#include "../lib/airplay/raop.h"

void audio_process(void *, raop_ntp_t *, aac_decode_struct *);
void video_process(void *, raop_ntp_t *, h264_decode_struct *);
void audio_flush(void *);
void video_flush(void *);
void audio_set_volume(void *, float);
void log_callback(void *, int, const char *);
void airplay_connection_established(void *, uint64_t);

#endif
