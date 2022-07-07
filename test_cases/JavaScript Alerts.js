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



describe("REGR_JavaScript Alerts", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-60, verify title, description and first button.", async function(){


        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("JavaScript Alerts");

        var description = await driver.findElement(By.css("#content > div > p:nth-child(2)")).getText();

        await description.should.equal("Here are some examples of different JavaScript alerts which can be troublesome for automation");

        await driver.findElement(By.css("#content > div > ul > li:nth-child(1) > button")).click();

        await driver.wait(until.alertIsPresent());

        let alert_1 = await driver.switchTo().alert();

        await alert_1.accept();

        var result = await driver.findElement(By.css("#content > div > h4")).getText();

        await result.should.equal("Result:");

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You successfully clicked an alert");

    });
    
    it("TC-61, verify second button", async function(){

        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');

        await driver.findElement(By.css("#content > div > ul > li:nth-child(2) > button")).click();

        await driver.wait(until.alertIsPresent());

        let alert_1 = await driver.switchTo().alert();

        await alert_1.accept();

        var result = await driver.findElement(By.css("#content > div > h4")).getText();

        await result.should.equal("Result:");

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You clicked: Ok");

        await driver.findElement(By.css("#content > div > ul > li:nth-child(2) > button")).click();

        await driver.wait(until.alertIsPresent());

        let alert_2 = await driver.switchTo().alert();

        await alert_2.dismiss();

        var result = await driver.findElement(By.css("#content > div > h4")).getText();

        await result.should.equal("Result:");

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You clicked: Cancel");

    });
    

    it("TC-62, verify third button", async function(){
            
        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');

        //no text
        await driver.findElement(By.css("#content > div > ul > li:nth-child(3) > button")).click();

        await driver.wait(until.alertIsPresent());

        let alert_1 = await driver.switchTo().alert();

        await alert_1.accept();

        var result = await driver.findElement(By.css("#content > div > h4")).getText();

        await result.should.equal("Result:");

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered:");


        //text scenario
        await driver.findElement(By.css("#content > div > ul > li:nth-child(3) > button")).click();

        let alert_2 = await driver.switchTo().alert();

        await driver.switchTo().alert().sendKeys('trzuiouz');

        await alert_2.accept();

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered: trzuiouz");


        //text with special charcters
        await driver.findElement(By.css("#content > div > ul > li:nth-child(3) > button")).click();

        let alert_3 = await driver.switchTo().alert();

        await driver.switchTo().alert().sendKeys('trzuiou464564/*-*?=)(/&%$#"!€€~ˇ^˘°˛`˙´zAFBV');

        await alert_3.accept();

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal('You entered: trzuiou464564/*-*?=)(/&%$#"!€€~ˇ^˘°˛`˙´zAFBV');


    });
    
});
