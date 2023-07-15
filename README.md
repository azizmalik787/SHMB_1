FrontEND------------------------------------------------------------------------------------------------------------------------------------------------------

download "src" folder from drive
download VS-code from "https://code.visualstudio.com/download" in ".deb" format
command: cd
command: sudo apt install ./name.deb //install downloaded .deb file, where "./name.deb" is path of downloaded .deb file
open VS-code
open ternimal //external terminal (Ctrl+Shift+C) or vs-code terminal (Ctrl+`)
command: cd ~/Desktop 
command: npx create-react-app my-app //create react project with name "my-app" on desktop
command: cd my-app //optional (run this command, if using external terminal / skip, if using vs-code terminal)
Replace "src" in "my-app" folder on desktop with downloaded "src" folder
open "my-app" folder in vs-code
command: npm cache clean —force
command: rm -rf node_modules package-lock.json
command: npm install
open package.json and replace "start": "react-scripts start" to "start": "PORT=4000 react-scripts start" on line 24 //change default port because rest-api is using that port
command: npm start //will open front end project in default browser

BackendEND------------------------------------------------------------------------------------------------------------------------------------------------------

download .bna file from drive and extract it
install VS-code (if not already installed), open it and install Hyperledger Composer extension from the Marketplace
open https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs.html to install prerequisites OR simply copy paste following commands in terminal:
	cd
	curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh
	chmod u+x prereqs-ubuntu.sh
	./prereqs-ubuntu.sh
now open https://hyperledger.github.io/composer/v0.19/installing/development-tools.html for backend setup OR simply copy paste following commands in terminal:
	npm install -g composer-cli@0.19
	npm install -g composer-rest-server@0.19
	npm install -g generator-hyperledger-composer@0.19
	npm install -g yo
	npm install -g composer-playground@0.19
	mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
	curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
	tar -xvf fabric-dev-servers.tar.gz
	cd ~/fabric-dev-servers
	export FABRIC_VERSION=hlfv11
	./downloadFabric.sh
	cd ~/fabric-dev-servers
	export FABRIC_VERSION=hlfv11
	./startFabric.sh
	./createPeerAdminCard.sh
setup is done
Now to start docker and composer:
	cd fabric-dev-servers/fabric-scripts/hlfv1/composer
	docker-compose start
	composer-playground
hyperledger composer will open
To create BNA
	enter name:shmb
	description: 
	network:admin@shmb
	choose empty bussiness network
	choose id and secret
	enter "admin" as id and "adminpw" as secret
	enter deploy
empty bna will be created 
click on "add file" from left panel
click browser add model, script, permission and query files from extracted .bna file
click deploy on left bottom of composer
 
And to stop docker after working
	cd fabric-dev-servers/fabric-scripts/hlfv1/composer
	docker-compose stop

REST-API------------------------------------------------------------------------------------------------------------------------------------------------------
	
To build composer rest server api,open terminal and copy paste:	composer-rest-server
when asked write: admin@shmb
select: never use namespaces option
then enter these options one by one in order: no,  no,  yes,  just simply press enter, yes, no
Rest-api will open on port 3000 in default browser

OR 

command: composer-rest-server -c admin@shmb -n never -u true -w true
