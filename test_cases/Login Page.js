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




describe("REGR_Login Page", async function(){//known issue present, BUG filename
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-39, verify that user is not able to login without usename and password", async function(){

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");
        
        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your username is invalid!\n×");

        driver.sleep(2000);

    });
    

    it("TC-40, verify that user is not able to login without password", async function(){

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='username']")).sendKeys("tomsmith");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your password is invalid!\n×");

        driver.sleep(2000);

    });
    
    it("TC-41, verify that user is not able to login without username", async function(){

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='password']")).sendKeys("SuperSecretPassword!");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your username is invalid!\n×");
        
        driver.sleep(2000);


    });
    

    it("TC-42, verify that user is not able to login with invalid username and password", async function(){
        

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='username']")).sendKeys("tom");

        await driver.findElement(By.css("input[name='password']")).sendKeys("SecretPassword!");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your username is invalid!\n×");

        driver.sleep(2000);

    });
    
    
    it("TC-43, verify that user is not able to login with invalid password", async function(){
        

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='username']")).sendKeys("tomsmith");

        await driver.findElement(By.css("input[name='password']")).sendKeys("SecretPassword!");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your password is invalid!\n×");

        driver.sleep(2000);


    });
    

    it("TC-44, verify that user is not able to login with invalid username", async function(){
        

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='username']")).sendKeys("tom");

        await driver.findElement(By.css("input[name='password']")).sendKeys("SuperSecretPassword!");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your username is invalid!\n×");

        driver.sleep(2000);


    });
 

    it("TC-45, verify that user is able to login with valid username and password", async function(){

        await driver.get('https://the-internet.herokuapp.com/login');

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("input[name='username']")).sendKeys("tomsmith");

        await driver.findElement(By.css("input[name='password']")).sendKeys("SuperSecretPassword!");

        await driver.findElement(By.css("button[class='radius']")).click();

        var response_title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await response_title.should.equal("Secure Area");

        var response_description = await driver.findElement(By.css("div[class='example'] > h4")).getText();

        await response_description.should.equal("Welcome to the Secure Area. When you are done click logout below.");

        var response_flash = await driver.findElement(By.css("div[class='flash success']")).getText();

        await response_flash.should.equal("You logged into a secure area!\n×");

        //logout

        await driver.findElement(By.css("a[class='button secondary radius']")).click();

        var title = await driver.findElement(By.css("div[class='example'] > h2")).getText();

        await title.should.equal("Login Page");

        var description = await driver.findElement(By.css("h4[class='subheader']")).getText();

        await description.should.equal("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");

        await driver.findElement(By.css("button[class='radius']")).click();

        var respon_message = await driver.findElement(By.css("div[class='flash error']")).getText();

        await respon_message.should.equal("Your username is invalid!\n×");

        driver.sleep(2000); //prevents TimeoutError: Failed to read marionette port

    });
    
});