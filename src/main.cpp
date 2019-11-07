#include <iostream>
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

static raop_t* raop;
static dnssd_t* dnssd;

int main(int argv, const char** args) {
    std::vector<char> server_hw_address = DEFAULT_HW_ADDRESS;    

    std::string mac_address = find_mac();
    if (!mac_address.empty()) {
        server_hw_address.clear();
        parse_hw_addr(mac_address, server_hw_address);
    }

    if (start_airplay_server(raop, dnssd, server_hw_address) != 0) {
        printf("Couldn't start airplay server.");
        return 1;
    }

    running = true;
    while (running) {
        sleep(1);
    }
}