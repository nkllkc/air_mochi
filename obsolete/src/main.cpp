#include <iostream>
#include <string>
#include <stdio.h>
#include <stddef.h>
#include <signal.h>
#include <unistd.h>
#include <vector>

#include "lib/airplay/stream.h"
#include "lib/airplay/raop.h"
#include "lib/airplay/dnssd.h"
#include "lib/librtmp/srs_librtmp.h"
#include "util/rtmp_connector.h"
#include "util/util.h"
#include "airplay_server/airplay_server.h"
#include "airplay_server/airplay_callbacks.h"

static int running;

static void signal_handler(int sig) {
    switch (sig) {
    case SIGINT:
    case SIGTERM:
        running = 0;
        break;
    }
}

static void init_signals(void) {
    struct sigaction sigact;

    sigact.sa_handler = signal_handler;
    sigemptyset(&sigact.sa_mask);
    sigact.sa_flags = 0;
    sigaction(SIGINT, &sigact, NULL);
    sigaction(SIGTERM, &sigact, NULL);
}

static int parse_hw_addr(std::string str, std::vector<char> &hw_addr) {
    for (int i = 0; i < str.length(); i+=3) {
        hw_addr.push_back((char) stol(str.substr(i), NULL, 16));
    }
    return 0;
}

static srs_rtmp_t rtmp;
static int is_rtmp_set = 0;

static raop_t* raop;
static dnssd_t* dnssd;

static const char* rtmp_url;
static float fps;

void airplay_connection_established(void *cls, uint64_t streamConnectionId) {
    rtmp = start_rtmp_connection(rtmp_url, fps);
    is_rtmp_set = 1;
    printf("RTMP server is running...\n");
};

int main(int args, const char** argv) {
    if (args < 3) {
        printf("Please specify URL and FPS.\n");
        return 1;
    }

    rtmp_url = argv[1];
    fps = std::stof(argv[2]);

    std::vector<char> server_hw_address = DEFAULT_HW_ADDRESS;    

    std::string mac_address = find_mac();
    if (!mac_address.empty()) {
        server_hw_address.clear();
        parse_hw_addr(mac_address, server_hw_address);
    }

    if (start_airplay_server(
            raop, 
            dnssd, 
            server_hw_address, 
            airplay_connection_established) != 0) {
        printf("Couldn't start AirPlay server.");
        return 1;
    }
    
    running = true;
    while (running) {
        sleep(1);
    }

    stop_airplay_server(raop, dnssd);
    if (is_rtmp_set) {
        stop_rtmp_connection(rtmp);
    }
}