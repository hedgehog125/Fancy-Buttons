cd $(dirname $0) # The project folder
echo "Installing...
"

echo "
== 1/3: Installing static server dependencies ==
"
cd ../static
npm install

echo "
== 2/2: Installing tool dependencies ==
"
cd ../tools
npm install

echo "
Installed.
"