#!/bin/bash

# Activate Venv
. ~/Documents/GPU/bin/activate

# Set cuda path
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-9.0/lib64/

# run start script
npm run dev

# # For cleanup
# killall node

# # For Testing
# python controller.py [1,0,0,0] 1