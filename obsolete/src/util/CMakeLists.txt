cmake_minimum_required(VERSION 3.4.1)
aux_source_directory(. util_src)
set(DIR_SRCS ${util_src})
add_library( util
        STATIC
        ${DIR_SRCS})