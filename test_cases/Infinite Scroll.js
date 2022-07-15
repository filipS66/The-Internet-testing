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



describe("REGR_Infinite Scroll", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-52, verify that Infinite Scroll works properly", async function(){
            

        await driver.get('https://the-internet.herokuapp.com/infinite_scroll');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Infinite Scroll");

        await driver.sleep(2000);

        var number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(3);

        await driver.executeScript(
            'window.scrollTo(0, 800)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(4);

        await driver.executeScript(
            'window.scrollTo(0, 1200)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(5);

        await driver.executeScript(
            'window.scrollTo(0, 1500)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(6);

        await driver.executeScript(
            'window.scrollTo(0, 1200)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(6);

        await driver.executeScript(
            'window.scrollTo(0, 800)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(6);

        await driver.executeScript(
            'window.scrollTo(0, 2500)' );

        await driver.sleep(2000);

        number_of_sections = await driver.findElements(By.css("div[class='jscroll-inner'] > div"));

        await number_of_sections.should.have.lengthOf(7);


    });
    
});
