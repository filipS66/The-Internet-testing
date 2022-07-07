//User name on local machine. Example John's path to Downloads --> C:/Users/John/Downloads
const user_name = "Filip";
//-----------------------------------------------

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
    Key = webdriver.Key;

const { debug } = require('console');

var should = require('chai').should();
var expect = require('chai').expect;



describe("REGR_Javascript Error", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-63, capture JS error", async function(){
        
        const cdpConnection = await driver.createCDPConnection('page')
        await driver.onLogException(cdpConnection, function (event) {
            const js_error = "TypeError: document.propertyThatDoesNotExist is undefined";
            js_error.should.equal(event['exceptionDetails'].text);

        })

        await driver.get('https://the-internet.herokuapp.com/javascript_error');

    });
    
});