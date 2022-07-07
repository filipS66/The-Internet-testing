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




describe("REGR_Opening a new window", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-66, verify that window opens on click", async function(){
        
        var assert = require('assert');


        await driver.get('https://the-internet.herokuapp.com/windows');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Opening a new window");

        //Store the ID of the original window
        const originalWindow = await driver.getWindowHandle();

        //Check we don't have other windows open already
        assert((await driver.getAllWindowHandles()).length === 1);

        //Click the link which opens in a new window
        await driver.findElement(By.css("#content > div > a")).click();

        //Wait for the new window or tab
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000
        );

        //Loop through until we find a new window handle
        const windows = await driver.getAllWindowHandles();
        windows.forEach(async handle => {
        if (handle !== originalWindow) {
            await driver.switchTo().window(handle);
        }
        });

        //Wait for the new tab to finish loading content
        await driver.wait(until.titleIs('New Window'), 10000);

    });
    
});
