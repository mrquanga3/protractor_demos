exports.config = {
    directConnect: true,
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'tests/todo-spec.js',
        'tests/pages/test_home_page.js'
    ],
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
    ],
    onPrepare: function () {
        // Getting CLI report
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: 'pretty',
            }
        }));
        //Getting XML report
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'guitest-xmloutput',
            savePath: './reports/'
        }));
        //Getting screenshots
        var fs = require('fs-extra');
        fs.emptyDir('reports/screenshots/', function (err) {
            console.log(err);
        });
        jasmine.getEnv().addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');
                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream('./reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer.from(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });

        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './report2/screenshots'
            })
        );

    },
    onComplete: function () {
        //Getting HTML report
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');
            var HTMLReport = require('protractor-html-reporter-2');
            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: './reports/',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('./reports/guitest-xmloutput.xml', testConfig);
        });
    },
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },
    /*plugins: [{
        package: './node_modules/jasmine2-protractor-utils',
        disableHTMLReport: false,
        disableScreenshot: false,
        screenshotPath: './reports/screenshots',
        screenshotOnExpectFailure: true,
        screenshotOnSpecFailure: true,
        clearFoldersBeforeTest: true,
        htmlReportDir: './reports/htmlReports',
        failTestOnErrorLog: {
            failTestOnErrorLogLevel: 900,
            excludeKeywords: ['keyword1', 'keyword2']
        }
    }]*/
};