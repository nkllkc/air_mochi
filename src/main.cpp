#include "lib/librtmp/srs_librtmp.h"
#include "util/rtmp_connector.h"

#include <iostream>
#include <stdio.h>
#include <stddef.h>
#include <signal.h>
#include <unistd.h>
#include <vector>

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

static srs_rtmp_t t;

int main(int argv, const char** args) {
    int x = AAA;
    printf("%d\n", x);
    start_rtmp_connection("rtmp://127.0.0.1:1935/live/mystream", 125.0);
    // std::cin >> x;
    stop_rtmp_connection(t);
}