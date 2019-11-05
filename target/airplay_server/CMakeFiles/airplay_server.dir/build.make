# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.10

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/nikola/dev/mochi/air_mochi/src

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/nikola/dev/mochi/air_mochi/target

# Include any dependencies generated for this target.
include airplay_server/CMakeFiles/airplay_server.dir/depend.make

# Include the progress variables for this target.
include airplay_server/CMakeFiles/airplay_server.dir/progress.make

# Include the compile flags for this target's objects.
include airplay_server/CMakeFiles/airplay_server.dir/flags.make

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o: airplay_server/CMakeFiles/airplay_server.dir/flags.make
airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o: /home/nikola/dev/mochi/air_mochi/src/airplay_server/airplay_server.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/air_mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o"
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && /usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/airplay_server.dir/airplay_server.cpp.o -c /home/nikola/dev/mochi/air_mochi/src/airplay_server/airplay_server.cpp

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/airplay_server.dir/airplay_server.cpp.i"
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/nikola/dev/mochi/air_mochi/src/airplay_server/airplay_server.cpp > CMakeFiles/airplay_server.dir/airplay_server.cpp.i

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/airplay_server.dir/airplay_server.cpp.s"
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && /usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/nikola/dev/mochi/air_mochi/src/airplay_server/airplay_server.cpp -o CMakeFiles/airplay_server.dir/airplay_server.cpp.s

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.requires:

.PHONY : airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.requires

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.provides: airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.requires
	$(MAKE) -f airplay_server/CMakeFiles/airplay_server.dir/build.make airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.provides.build
.PHONY : airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.provides

airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.provides.build: airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o


# Object files for target airplay_server
airplay_server_OBJECTS = \
"CMakeFiles/airplay_server.dir/airplay_server.cpp.o"

# External object files for target airplay_server
airplay_server_EXTERNAL_OBJECTS =

airplay_server/libairplay_server.a: airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o
airplay_server/libairplay_server.a: airplay_server/CMakeFiles/airplay_server.dir/build.make
airplay_server/libairplay_server.a: airplay_server/CMakeFiles/airplay_server.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/nikola/dev/mochi/air_mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX static library libairplay_server.a"
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && $(CMAKE_COMMAND) -P CMakeFiles/airplay_server.dir/cmake_clean_target.cmake
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/airplay_server.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
airplay_server/CMakeFiles/airplay_server.dir/build: airplay_server/libairplay_server.a

.PHONY : airplay_server/CMakeFiles/airplay_server.dir/build

airplay_server/CMakeFiles/airplay_server.dir/requires: airplay_server/CMakeFiles/airplay_server.dir/airplay_server.cpp.o.requires

.PHONY : airplay_server/CMakeFiles/airplay_server.dir/requires

airplay_server/CMakeFiles/airplay_server.dir/clean:
	cd /home/nikola/dev/mochi/air_mochi/target/airplay_server && $(CMAKE_COMMAND) -P CMakeFiles/airplay_server.dir/cmake_clean.cmake
.PHONY : airplay_server/CMakeFiles/airplay_server.dir/clean

airplay_server/CMakeFiles/airplay_server.dir/depend:
	cd /home/nikola/dev/mochi/air_mochi/target && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/nikola/dev/mochi/air_mochi/src /home/nikola/dev/mochi/air_mochi/src/airplay_server /home/nikola/dev/mochi/air_mochi/target /home/nikola/dev/mochi/air_mochi/target/airplay_server /home/nikola/dev/mochi/air_mochi/target/airplay_server/CMakeFiles/airplay_server.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : airplay_server/CMakeFiles/airplay_server.dir/depend

