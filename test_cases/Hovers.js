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



describe("REGR_Hovers", async function(){//known issue present, BUG filename

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-51, verify that Hover works on all images properly", async function(){


        await driver.get('https://the-internet.herokuapp.com/hovers');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Hovers");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Hover over the image for additional information");

        var img_1 = await driver.findElement(By.css("#content > div > div:nth-child(3) > img"));

        var actions = driver.actions({bridge: true}); 
        await actions.move({duration:5000,origin:img_1,x:0,y:0}).perform();

        var img_1_txt = await driver.findElement(By.css("#content > div > div:nth-child(3) > div > h5")).getText();

        await img_1_txt.should.equal("name: user1");

        var img_1_link = await driver.findElement(By.css("#content > div > div:nth-child(3) > div > a")).getText();

        await img_1_link.should.equal("View profile");

        await driver.findElement(By.css("#content > div > div:nth-child(3) > div > a")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        });

        await current_url.should.equal("https://the-internet.herokuapp.com/users/1");

        var view_profile_1 = await driver.findElement(By.css("body > h1")).getText();
        
        await view_profile_1.should.not.equal("Not Found");

        //second img
        await driver.get('https://the-internet.herokuapp.com/hovers');

        var img_2 = await driver.findElement(By.css("#content > div > div:nth-child(4) > img"));

        actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:img_2,x:0,y:0}).perform();

        var img_2_txt = await driver.findElement(By.css("#content > div > div:nth-child(4) > div > h5")).getText();

        await img_2_txt.should.equal("name: user2");

        var img_2_link = await driver.findElement(By.css("#content > div > div:nth-child(4) > div > a")).getText();

        await img_2_link.should.equal("View profile");

        await driver.findElement(By.css("#content > div > div:nth-child(4) > div > a")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        });

        await current_url.should.equal("https://the-internet.herokuapp.com/users/2");

        var view_profile_2 = await driver.findElement(By.css("body > h1")).getText();
        
        await view_profile_2.should.not.equal("Not Found");

        //third img
        await driver.get('https://the-internet.herokuapp.com/hovers');

        var img_3 = await driver.findElement(By.css("#content > div > div:nth-child(5) > img"));

        actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:img_3,x:0,y:0}).perform();

        var img_3_txt = await driver.findElement(By.css("#content > div > div:nth-child(5) > div > h5")).getText();

        await img_3_txt.should.equal("name: user3");

        var img_3_link = await driver.findElement(By.css("#content > div > div:nth-child(5) > div > a")).getText();

        await img_3_link.should.equal("View profile");

        await driver.findElement(By.css("#content > div > div:nth-child(5) > div > a")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        });

        await current_url.should.equal("https://the-internet.herokuapp.com/users/3");

        var view_profile_3 = await driver.findElement(By.css("body > h1")).getText();
        
        await view_profile_3.should.not.equal("Not Found");

    });
    
});

