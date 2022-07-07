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



describe("REGR_Typos", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-76, verifty Typos", async function(){//BUG present


        //iteration 1
        await driver.get('https://the-internet.herokuapp.com/typos');

        await driver.sleep(1000);

        var title = await driver.findElement(By.css('#content > div > h3')).getText(); 

        await title.should.equal("Typos");

        var despription_1 = await driver.findElement(By.css('#content > div > p:nth-child(2)')).getText();

        await despription_1.should.equal("This example demonstrates a typo being introduced. It does it randomly on each page load.");

        var despription_2 = await driver.findElement(By.css('#content > div > p:nth-child(3)')).getText();

        await despription_2.should.equal("Sometimes you'll see a typo, other times you won't.");

    });
    
});

