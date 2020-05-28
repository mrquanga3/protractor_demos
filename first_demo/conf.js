exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['tests/todo-spec.js'],
    multiCapabilities: [
        {
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                args: ["--headless"]
            }
        },
        {
            'browserName': 'chrome',
            chromeOptions: {
                args: ["--headless", "--disable-gpu", "--window-size=800,600"]
            }
        }
    ]
};