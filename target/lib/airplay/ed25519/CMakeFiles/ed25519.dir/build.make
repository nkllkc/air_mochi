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
CMAKE_SOURCE_DIR = /home/nikola/dev/mochi/src

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/nikola/dev/mochi/target

# Include any dependencies generated for this target.
include lib/airplay/ed25519/CMakeFiles/ed25519.dir/depend.make

# Include the progress variables for this target.
include lib/airplay/ed25519/CMakeFiles/ed25519.dir/progress.make

# Include the compile flags for this target's objects.
include lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/add_scalar.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/add_scalar.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/add_scalar.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/add_scalar.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/add_scalar.c > CMakeFiles/ed25519.dir/add_scalar.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/add_scalar.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/add_scalar.c -o CMakeFiles/ed25519.dir/add_scalar.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/fe.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/fe.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/fe.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/fe.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/fe.c > CMakeFiles/ed25519.dir/fe.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/fe.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/fe.c -o CMakeFiles/ed25519.dir/fe.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/ge.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/ge.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/ge.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/ge.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/ge.c > CMakeFiles/ed25519.dir/ge.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/ge.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/ge.c -o CMakeFiles/ed25519.dir/ge.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/key_exchange.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/key_exchange.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/key_exchange.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/key_exchange.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/key_exchange.c > CMakeFiles/ed25519.dir/key_exchange.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/key_exchange.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/key_exchange.c -o CMakeFiles/ed25519.dir/key_exchange.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/keypair.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/keypair.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/keypair.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/keypair.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/keypair.c > CMakeFiles/ed25519.dir/keypair.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/keypair.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/keypair.c -o CMakeFiles/ed25519.dir/keypair.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/sc.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/sc.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/sc.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/sc.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/sc.c > CMakeFiles/ed25519.dir/sc.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/sc.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/sc.c -o CMakeFiles/ed25519.dir/sc.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/seed.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/seed.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/seed.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/seed.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/seed.c > CMakeFiles/ed25519.dir/seed.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/seed.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/seed.c -o CMakeFiles/ed25519.dir/seed.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/sha512.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/sha512.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/sha512.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/sha512.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/sha512.c > CMakeFiles/ed25519.dir/sha512.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/sha512.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/sha512.c -o CMakeFiles/ed25519.dir/sha512.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/sign.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/sign.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/sign.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/sign.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/sign.c > CMakeFiles/ed25519.dir/sign.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/sign.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/sign.c -o CMakeFiles/ed25519.dir/sign.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o


lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o: lib/airplay/ed25519/CMakeFiles/ed25519.dir/flags.make
lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o: /home/nikola/dev/mochi/src/lib/airplay/ed25519/verify.c
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Building C object lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -o CMakeFiles/ed25519.dir/verify.c.o   -c /home/nikola/dev/mochi/src/lib/airplay/ed25519/verify.c

lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/ed25519.dir/verify.c.i"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/nikola/dev/mochi/src/lib/airplay/ed25519/verify.c > CMakeFiles/ed25519.dir/verify.c.i

lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/ed25519.dir/verify.c.s"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/nikola/dev/mochi/src/lib/airplay/ed25519/verify.c -o CMakeFiles/ed25519.dir/verify.c.s

lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.requires:

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.provides: lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.requires
	$(MAKE) -f lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.provides.build
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.provides

lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.provides.build: lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o


# Object files for target ed25519
ed25519_OBJECTS = \
"CMakeFiles/ed25519.dir/add_scalar.c.o" \
"CMakeFiles/ed25519.dir/fe.c.o" \
"CMakeFiles/ed25519.dir/ge.c.o" \
"CMakeFiles/ed25519.dir/key_exchange.c.o" \
"CMakeFiles/ed25519.dir/keypair.c.o" \
"CMakeFiles/ed25519.dir/sc.c.o" \
"CMakeFiles/ed25519.dir/seed.c.o" \
"CMakeFiles/ed25519.dir/sha512.c.o" \
"CMakeFiles/ed25519.dir/sign.c.o" \
"CMakeFiles/ed25519.dir/verify.c.o"

# External object files for target ed25519
ed25519_EXTERNAL_OBJECTS =

lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/build.make
lib/airplay/ed25519/libed25519.a: lib/airplay/ed25519/CMakeFiles/ed25519.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/nikola/dev/mochi/target/CMakeFiles --progress-num=$(CMAKE_PROGRESS_11) "Linking C static library libed25519.a"
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && $(CMAKE_COMMAND) -P CMakeFiles/ed25519.dir/cmake_clean_target.cmake
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/ed25519.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
lib/airplay/ed25519/CMakeFiles/ed25519.dir/build: lib/airplay/ed25519/libed25519.a

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/build

lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/add_scalar.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/fe.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/ge.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/key_exchange.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/keypair.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sc.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/seed.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sha512.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/sign.c.o.requires
lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires: lib/airplay/ed25519/CMakeFiles/ed25519.dir/verify.c.o.requires

.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/requires

lib/airplay/ed25519/CMakeFiles/ed25519.dir/clean:
	cd /home/nikola/dev/mochi/target/lib/airplay/ed25519 && $(CMAKE_COMMAND) -P CMakeFiles/ed25519.dir/cmake_clean.cmake
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/clean

lib/airplay/ed25519/CMakeFiles/ed25519.dir/depend:
	cd /home/nikola/dev/mochi/target && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/nikola/dev/mochi/src /home/nikola/dev/mochi/src/lib/airplay/ed25519 /home/nikola/dev/mochi/target /home/nikola/dev/mochi/target/lib/airplay/ed25519 /home/nikola/dev/mochi/target/lib/airplay/ed25519/CMakeFiles/ed25519.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : lib/airplay/ed25519/CMakeFiles/ed25519.dir/depend

