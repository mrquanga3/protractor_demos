exports.config = {
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'tests/list_element.js',
        //'tests/todo-spec.js',
        //'tests/pages/test_home_page.js'
    ],
    multiCapabilities: [
        {
            'browserName': 'firefox',
            'moz:firefoxOptions': {
                args: []
            }
        },
        {
            'browserName': 'chrome',
            chromeOptions: {
                args: ["--disable-gpu", "--window-size=800,600"]
            }
        }
    ],
};