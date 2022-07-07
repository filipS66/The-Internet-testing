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


describe("REGR_Digest Authentication", async function(){

    var driver;
    
    it("TC-15, verify if a user will be able to login with a valid username and valid password.", async function(){

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        await driver.get('https://admin:admin@the-internet.herokuapp.com/basic_auth');

        var title = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 

        await title.should.equal("Basic Auth");

        var paragraph_congrats = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[1]")).getText(); 

        await paragraph_congrats.should.equal("Congratulations! You must have the proper credentials.");

        var footer = await driver.findElement(By.css("div[style='text-align: center;']")).getText(); 

        await footer.should.equal("Powered by Elemental Selenium");

        var link_elemental_selenium = await driver.findElement(By.css("a[href='http://elementalselenium.com/']")).getText();  

        await link_elemental_selenium.should.equal("Elemental Selenium");

        await driver.quit();
    })

    

    it("TC-16, verify that user is not able to login with a valid username and invalid password.", async function(){

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        await driver.get('https://admin:admi@the-internet.herokuapp.com/basic_auth');

        try{
            await driver.getCurrentUrl();
        }catch(e){
            e.message.should.equal("Dismissed user prompt dialog: Ova web-stranica zahtijeva da se prijaviš.");
        }
        await driver.quit();
    })
    
    
    it("TC-17, verify the login page for both, when the field is blank and Submit button is clicked.", async function(){

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        await driver.get('https://the-internet.herokuapp.com/basic_auth');

        await driver.sleep(1000);

        await driver.wait(until.alertIsPresent());

        let alert_1 = await driver.switchTo().alert();

        await alert_1.accept();

        await driver.sleep(1000);

        alert_2 = await driver.switchTo().alert();

        await alert_2.accept();

        await driver.sleep(1000);

        var paragraph = await driver.findElement(By.xpath("/html[1]/body[1]")).getText(); 

        await paragraph.should.equal("Not authorized");

        await driver.quit();
    })
    
});

