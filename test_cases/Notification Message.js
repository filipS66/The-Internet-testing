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




describe("REGR_Notification Message", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-67, verify notification message after click", async function(){

        await driver.get('https://the-internet.herokuapp.com/notification_message_rendered');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Notification Message");

        var description_1 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_1.should.equal(`The message displayed above the heading is a notification message. It is often used to convey information about an action previously taken by the user.\n\nSome rudimentary examples include 'Action successful', 'Action unsuccessful, please try again', etc.\n\nClick here to load a new message.`);
            
    });
    
    
    it("TC-68, verify notification message after click", async function(){


        await driver.get('https://the-internet.herokuapp.com/notification_message_rendered');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Notification Message");

        var description_1 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_1.should.equal(`The message displayed above the heading is a notification message. It is often used to convey information about an action previously taken by the user.\n\nSome rudimentary examples include 'Action successful', 'Action unsuccessful, please try again', etc.\n\nClick here to load a new message.`);
            
        await driver.findElement(By.css("#content > div > p > a")).click();

        await driver.sleep(3000);

        var notification_message = await driver.findElement(By.css("#flash")).getText();

        await notification_message.should.equal("Action successful\n×");

    });
    
});