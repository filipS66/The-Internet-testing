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





describe("REGR_Redirection", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-69, verify redirection ", async function(){

        await driver.get('https://the-internet.herokuapp.com/redirector');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("Redirection");

        var description_1 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_1.should.equal(`This is separate from directly returning a redirection status code, in that some browsers cannot handle a raw redirect status code without a destination page as part of the HTTP response.\n\nClick here to trigger a redirect (and be taken to the status codes page).`);
            
        await driver.findElement(By.css("#content > div > p > a")).click();

        
        var title_status = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_status.should.equal("Status Codes");

        var description_status = await driver.findElement(By.css('#content > div > p')).getText();

        await description_status.should.equal(`HTTP status codes are a standard set of numbers used to communicate from a web server to your browser to indicate the outcome of the request being made (e.g. Success, Redirection, Client Error, Server Error). For a complete list of status codes, go here.\n\nSome standard status codes you will run into include but are not limited to:`);
            
        await driver.findElement(By.css("#content > div > ul > li:nth-child(1) > a")).click();//click on 200


        //status 200 page verification
        var title_200 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_200.should.equal("Status Codes");

        var description_200 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_200.should.equal(`This page returned a 200 status code.\n\nFor a definition and common list of HTTP status codes, go here`);

        await driver.findElement(By.css("#content > div > p > a")).click();//click on link, back to status page

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/status_codes");

        //status 301 page verification
        await driver.findElement(By.css("#content > div > ul > li:nth-child(2) > a")).click();//click on 301

        var title_301 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_301.should.equal("Status Codes");

        var description_301 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_301.should.equal(`This page returned a 301 status code.\n\nFor a definition and common list of HTTP status codes, go here`);

        await driver.findElement(By.css("#content > div > p > a")).click();//click on link, back to status page

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/status_codes");

        //status 404 page verification
        await driver.findElement(By.css("#content > div > ul > li:nth-child(3) > a")).click();//click on 404

        var title_404 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_404.should.equal("Status Codes");

        var description_404 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_404.should.equal(`This page returned a 404 status code.\n\nFor a definition and common list of HTTP status codes, go here`);

        await driver.findElement(By.css("#content > div > p > a")).click();//click on link, back to status page

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/status_codes");


        //status 500 page verification
        await driver.findElement(By.css("#content > div > ul > li:nth-child(4) > a")).click();//click on 500

        var title_500 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_500.should.equal("Status Codes");

        var description_500 = await driver.findElement(By.css('#content > div > p')).getText();

        await description_500.should.equal(`This page returned a 500 status code.\n\nFor a definition and common list of HTTP status codes, go here`);

        await driver.findElement(By.css("#content > div > p > a")).click();//click on link, back to status page

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 


        current_url.should.equal("https://the-internet.herokuapp.com/status_codes");

    });
    
});