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



describe("REGR_Large & Deep DOM", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-65, verify large and deep dom", async function(){
            
        await driver.get('https://the-internet.herokuapp.com/large');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Large & Deep DOM");

        var description = await driver.findElement(By.css("#content > div > p")).getText();

        await description.should.equal("Some pages have very large and deeply nested page layouts, which can trigger odd rendering issues and test performance bottlenecks (depending on your locator strategy). These examples are nested 50 levels deep.");
        
        
        for(var i = 1; i < 51; i++ ){
            var value2 = await driver.findElement(By.xpath('//*[@id="sibling-' + String(i) + '.2"]')).getText();
            var value3 = await driver.findElement(By.xpath('//*[@id="sibling-' + String(i) + '.3"]')).getText();

            await value2.should.equal(String(i) + ".2");
            await value3.should.equal(String(i) + ".3");
        }
        
    });
    
});