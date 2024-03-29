# Protractor Demos

### Setup
Use npm to install Protractor globally with:
```sh
npm install -g protractor
```

This will install two command line tools, protractor and webdriver-manager. Try running `protractor --version` to make sure it's working.

The `webdriver-manager` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:
```sh
webdriver-manager update
```
Now start up a server with:
```sh
webdriver-manager start
```
This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at http://localhost:4444/wd/hub.

### Run the tests with
```sh
protractor conf.js
```
