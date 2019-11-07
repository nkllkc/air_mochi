cmake_minimum_required(VERSION 3.4.1)
aux_source_directory(. airplay_server_src)
set(DIR_SRCS ${airplay_server_src})

add_library( airplay_server
        STATIC
        ${DIR_SRCS})
target_link_libraries( airplay_server 
        airplay)