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


describe("REGR_Key Presses", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-64, verify title, description and pressed keys", async function(){

        await driver.get('https://the-internet.herokuapp.com/key_presses?');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Key Presses");

        var description = await driver.findElement(By.css("#content > div > p:nth-child(2)")).getText();

        await description.should.equal("Key presses are often used to interact with a website (e.g., tab order, enter, escape, etc.). Press a key and see what you inputted.");

        //TAB press
        await driver.findElement(By.css("#target")).click();
        await driver.findElement(By.css("#target")).sendKeys(Key.TAB);

        var result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered: TAB");

        //ENTER press
        await driver.findElement(By.css("#target")).click();
        await driver.findElement(By.css("#target")).sendKeys(Key.ENTER);

        result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered: ENTER");

        //SPACE press
        await driver.findElement(By.css("#target")).click();
        await driver.findElement(By.css("#target")).sendKeys(Key.SPACE);

        result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered: SPACE");

        //SHIFT press
        await driver.findElement(By.css("#target")).click();
        await driver.findElement(By.css("#target")).sendKeys(Key.SHIFT);

        result = await driver.findElement(By.css("#result")).getText();

        await result.should.equal("You entered: SHIFT");

    });
    
});
