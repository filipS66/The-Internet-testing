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



describe("REGR_Horizontal Slider", async function(){//known issue present, BUG filename

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-50, verify that Horizontal Slider works properly", async function(){
            
        await driver.get('https://the-internet.herokuapp.com/horizontal_slider');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Horizontal Slider");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("Set the focus on the slider (by clicking on it) and use the arrow keys to move it right and left. Or click and drag the slider with your mouse. It will indicate the value of the slider to the right.");

        await driver.findElement(By.css("input[type='range']")).click();
        
        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_RIGHT);
        
        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("3");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_RIGHT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("3.5");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_RIGHT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("4");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_RIGHT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("4.5");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_RIGHT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("5");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_LEFT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("4.5");

        await driver.findElement(By.css("input[type='range']")).sendKeys(Key.ARROW_LEFT);

        var range_number = await driver.findElement(By.css("span[id='range']")).getText();
        await range_number.should.equal("4");

    });
    
});
