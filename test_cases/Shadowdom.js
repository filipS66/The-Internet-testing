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


describe("REGR_Shadowdom", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-72, verify shadowdom text", async function(){

        await driver.get('https://the-internet.herokuapp.com/shadowdom');

        await driver.sleep(5000);

        var title = await driver.findElement(By.xpath('//*[@id="content"]/h1')).getText(); 

        await title.should.equal("Simple template");

        var shadow_elem_1 = await driver.executeScript(
            'return document.querySelector("#content > my-paragraph:nth-child(4) > span").innerHTML');

        await shadow_elem_1.should.equal("Let's have some different text!");
        
        var shadow_elem_2 = await driver.executeScript(
            'return document.querySelector("#content > my-paragraph:nth-child(5) > ul > li:nth-child(1)").innerHTML');

        await shadow_elem_2.should.equal("Let's have some different text!");

        var shadow_elem_3 = await driver.executeScript(
            'return document.querySelector("#content > my-paragraph:nth-child(5) > ul > li:nth-child(2)").innerHTML');

        await shadow_elem_3.should.equal("In a list!");
        
    });
    
});
