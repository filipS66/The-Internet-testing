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

describe("REGR_A/B Testing", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
  
    it("TC-1, verif text in paragraph", async function(){

        
        await driver.get('http://the-internet.herokuapp.com/');

        await driver.findElement(By.css("a[href='/abtest']")).click();
    
        var title_verifying = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 
        
        expect(title_verifying).to.be.oneOf(["A/B Test Variation 1", "A/B Test Control"]);
        

        var text_verifying = await driver.findElement(By.xpath('//*[@id="content"]/div/p')).getText();
        
        await text_verifying.should.equal("Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through).");
        
    })

});