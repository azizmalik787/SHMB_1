----------------------------------------------------FrontEND----------------------------------------------------<br>

download "src" folder from drive<br>
download VS-code from "https://code.visualstudio.com/download" in ".deb" format<br>
command: cd<br>
command: sudo apt install ./name.deb //install downloaded .deb file, where "./name.deb" is path of downloaded .deb file<br>
open VS-code<br>
open ternimal //external terminal (Ctrl+Shift+C) or vs-code terminal (Ctrl+`)<br>
command: cd ~/Desktop <br>
command: npx create-react-app my-app //create react project with name "my-app" on desktop<br>
command: cd my-app //optional (run this command, if using external terminal / skip, if using vs-code terminal)<br>
Replace "src" in "my-app" folder on desktop with downloaded "src" folder<br>
open "my-app" folder in vs-code<br>
command: npm cache clean —force<br>
command: rm -rf node_modules package-lock.json<br>
command: npm install<br>
open package.json and replace "start": "react-scripts start" to "start": "PORT=4000 react-scripts start" on line 24 //change default port because rest-api is using that port<br>
command: npm start //will open front end project in default browser<br>

----------------------------------------------------BackendEND----------------------------------------------------<br>

download .bna file from drive and extract it<br>
install VS-code (if not already installed), open it and install Hyperledger Composer extension from the Marketplace<br>
open https://hyperledger.github.io/composer/v0.19/installing/installing-prereqs.html to install prerequisites OR simply copy paste following commands in terminal:<br>
	cd<br>
	curl -O https://hyperledger.github.io/composer/v0.19/prereqs-ubuntu.sh<br>
	chmod u+x prereqs-ubuntu.sh<br>
	./prereqs-ubuntu.sh<br>
now open https://hyperledger.github.io/composer/v0.19/installing/development-tools.html for backend setup OR simply copy paste following commands in terminal:<br>
	npm install -g composer-cli@0.19<br>
	npm install -g composer-rest-server@0.19<br>
	npm install -g generator-hyperledger-composer@0.19<br>
	npm install -g yo<br>
	npm install -g composer-playground@0.19<br>
	mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers<br>
	curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
	tar -xvf fabric-dev-servers.tar.gz<br>
	cd ~/fabric-dev-servers<br>
	export FABRIC_VERSION=hlfv11<br>
	./downloadFabric.sh<br>
	cd ~/fabric-dev-servers<br>
	export FABRIC_VERSION=hlfv11<br>
	./startFabric.sh<br>
	./createPeerAdminCard.sh<br>
SETUP IS DONE<br>
Now to start docker and composer:<br>
	cd fabric-dev-servers/fabric-scripts/hlfv1/composer<br>
	docker-compose start<br>
	composer-playground<br>
hyperledger composer will open<br>
To create BNA<br>
	enter name:shmb<br>
	description: <br>
	network:admin@shmb<br>
	choose empty bussiness network<br>
	choose id and secret<br>
	enter "admin" as id and "adminpw" as secret<br>
	enter deploy<br>
empty bna will be created <br>
click on "add file" from left panel<br>
click browser add model, script, permission and query files from extracted .bna file<br>
click deploy on left bottom of composer<br>
 
And to stop docker after working<br>
	cd fabric-dev-servers/fabric-scripts/hlfv1/composer<br>
	docker-compose stop<br>

----------------------------------------------------REST-API----------------------------------------------------<br>
	
To build composer rest server api,open terminal and copy paste:	composer-rest-server<br>
when asked write: admin@shmb<br>
select: never use namespaces option<br>
then enter these options one by one in order: no,  no,  yes,  just simply press enter, yes, no<br>
Rest-api will open on port 3000 in default browser<br>

OR <br>

command: composer-rest-server -c admin@shmb -n never -u true -w true<br>
