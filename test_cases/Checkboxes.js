//User name on local machine. Example John's path to Downloads --> C:/Users/John/Downloads
const user_name = "Filip";
//-----------------------------------------------

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
    Key = webdriver.Key;

const { debug } = require('console');

//var firefox = require('selenium-webdriver/firefox');

var should = require('chai').should();
var expect = require('chai').expect;


describe("REGR_Checkboxes", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-11, verify current checkbox statuses, selectability and checkbox status after refresh", async function(){

        await driver.get('https://the-internet.herokuapp.com/checkboxes');

        var title = await driver.findElement(By.css("h3")).getText();

        await title.should.equal("Checkboxes");


        var form = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[1]"));

        //initial checkbox statuses
        var form_text = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]")).getText();
    
        await form_text.should.equal("checkbox 1\ncheckbox 2");

        var checkbox1 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[1]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox1.should.equal(false);

        var checkbox2 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[2]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox2.should.equal(true);


        //verify selectability
        var checkbox1 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[1]")).then( function(v) {
            return v;
        });

        await checkbox1.click();

        var checkbox1_status = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[1]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox1_status.should.equal(true);



        var checkbox2 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[2]")).then( function(v) {
            return v;
        });

        await checkbox2.click();

        var checkbox2_status = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[2]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox2_status.should.equal(false);


        //post refresh checkbox statuses
        await driver.navigate().refresh();

        var form_text = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]")).getText();
    
        await form_text.should.equal("checkbox 1\ncheckbox 2");

        var checkbox1 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[1]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox1.should.equal(false);

        var checkbox2 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/form[1]/input[2]")).then( function(v) {
            return v.isSelected();
        });

        await checkbox2.should.equal(true);

    });
    
    
});
