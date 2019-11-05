cmake_minimum_required(VERSION 3.4.1)
set (CMAKE_CXX_STANDARD 11)

# AirPlay deps.
add_subdirectory(lib/airplay/curve25519)
add_subdirectory(lib/airplay/ed25519)
add_subdirectory(lib/airplay/playfair)
add_subdirectory(lib/airplay/plist)
add_subdirectory(lib/airplay)

# Utils deps.
add_subdirectory(util)
add_subdirectory(airplay_server)

add_compile_options(-O0 -ldl -lstdc++ -lm -lcrypto -lcryptopp -lssl)

add_executable( air_mochi main.cpp )
target_link_libraries( air_mochi
    airplay 
    util
    airplay_server

    # 
    # TODO(nikola): Change this to point to a local library.
    # 
    /usr/lib/gcc/x86_64-linux-gnu/5.5.0/srs_librtmp.a
)