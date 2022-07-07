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




describe("REGR_Forgot Password", async function(){//known issue present, BUG filename
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-37, verify password reset with valid email address", async function(){

        await driver.get('https://the-internet.herokuapp.com/forgot_password');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Forgot Password");

        var email_label = await driver.findElement(By.css("label[for='email']")).getText();

        await email_label.should.equal("E-mail");

        await driver.findElement(By.css("input[name='email']")).sendKeys("neutPro1@protonmail.com");

        await driver.findElement(By.css("button[id='form_submit']")).click();

        var respon_message = await driver.findElement(By.css("body > h1:nth-child(1)")).getText();

        await respon_message.should.not.equal("Internal Server Error");

        driver.sleep(4000);

    });
    

    it("TC-38, verify password reset with invalid email address", async function(){
        
        await driver.get('https://the-internet.herokuapp.com/forgot_password');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Forgot Password");

        var email_label = await driver.findElement(By.css("label[for='email']")).getText();

        await email_label.should.equal("E-mail");

        await driver.findElement(By.css("input[name='email']")).sendKeys("neutPro1");

        await driver.findElement(By.css("button[id='form_submit']")).click();

        var respon_message = await driver.findElement(By.css("body > h1:nth-child(1)")).getText();

        await respon_message.should.not.equal("Internal Server Error");

        driver.sleep(4000);

    });
    
});

