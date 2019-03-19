#!/bin/sh

ARIA2C_BUILD_NAME=aria2-1.34.0-linux-gnu-64bit-build1.tar.bz2

echo "Downloading aria2c static build latest release from https://github.com/q3aql/aria2-static-builds"
wget -q https://github.com/q3aql/aria2-static-builds/releases/download/v1.34.0/aria2-1.34.0-linux-gnu-64bit-build1.tar.bz2
RESULT=$?
if [ $RESULT -ne 0 ]; then
	echo "Cannot download aria2c latest release from https://github.com/q3aql/aria2-static-builds site"
	exit 11 # terminate and indicate error
fi
echo "Downloaded aria2c static build extract and saved it as $ARIA2C_BUILD_NAME"



echo "Extracting static build extract $ARIA2C_BUILD_NAME"
tar xvjf $ARIA2C_BUILD_NAME --strip-components=1 aria2-1.34.0-linux-gnu-64bit-build1/aria2c aria2-1.34.0-linux-gnu-64bit-build1/ca-certificates.crt
RESULT=$?
if [ $RESULT -ne 0 ]; then
	echo "Error occurred in extracting $ARIA2C_BUILD_NAME"
	exit 21 # terminate and indicate error
fi
echo "Extraction completed successfully"

echo "Removing build extract $ARIA2C_BUILD_NAME"
rm -rf "$ARIA2C_BUILD_NAME"
echo "Removed build extract $ARIA2C_BUILD_NAME"


#converting static binaries to executables
chmod +x aria2c

#adding them to path variables
export PATH="$PATH:`pwd`/aria2c"
echo "aria2c lib installed successfully"

./aria2c --enable-rpc --rpc-listen-all --max-connection-per-server=16 --log=aria2c_rpc.log > /dev/null 2>&1 &

ARIA2C_PID=$!
echo "aria2c daemon started successfully on PORT 6800 with PID : $ARIA2C_PID"

heroku-php-apache2  #start web server