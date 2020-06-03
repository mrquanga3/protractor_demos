//import { element, by, browser } from "protractor"

describe('Protractor Demo App', function () {
    var firstNumber = element(by.xpath('//input[@ng-model="first"]'));
    var secondNumber = element(by.xpath('//input[@ng-model="second"]'));
    var goButton = element(by.id('gobutton'));
    var operatorSelect = element(by.xpath('//select[@ng-model="operator"]'));
    var history = element.all(by.xpath('//body//tbody//tr'));
    var list_history = element.all(by.css('td.ng-binding'))
    var latestResult = element(by.binding('latest')); // use protractor formatting
    function add(a, b) {
        firstNumber.sendKeys(a);
        secondNumber.sendKeys(b);
        goButton.click();
    }
    var selectDropdownbyText = function (element, optionText) {
        element.click();
        //browser.driver.sleep(1000);
        if (optionText) {
            var options = element.all(by.tagName('option'));
            options.each((option, index) => {
                option.getAttribute('value').then(function (text) {
                    //console.log(text);
                    //if (text == optionText) {
                        //option.click();
                    //}
                });
                option.getAttribute('selected').then(function (text) {
                    console.log(text);
                    //if (text == optionText) {
                        //option.click();
                    //}
                });
                option.getText().then(function (text) {
                    //console.log(text);
                    if (text == optionText) {
                        option.click();
                    }
                });

            });
            //});
        }
    };
    beforeEach(function () {
        browser.get('http://juliemr.github.io/protractor-demo/');
    })
    it('Do caculation with model, binding and repeat angular', function () {
        add(1, 2);
        expect(latestResult.getText()).toEqual('3');
        add(3, 4);
        expect(latestResult.getText()).toEqual('7');
        expect(history.count()).toEqual(2);
        //add(5, 6);
        //expect(history.count()).toEqual(0); // This is wrong!
    })
    it('Get value input field', function () {
        firstNumber.sendKeys('4');
        expect(firstNumber.getAttribute('value')).toEqual('4');
        secondNumber.sendKeys('2');
        selectDropdownbyText(operatorSelect, '*');
        goButton.click();
        browser.driver.sleep(10000);
        history.count().then(function(history_size){
            list_history.count().then(function(count_size){
                var latestResult = element(by.xpath('//tr[@ng-repeat]['+history_size+']/td[3]'));// use xpath instead of protractor binding
                expect(latestResult.getText()).toEqual('8');
            })
        })



    })
})