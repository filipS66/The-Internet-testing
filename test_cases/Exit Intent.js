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


describe("REGR_Exit Intent", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-32, verify modal window is triggered by exit intent", async function(){

        await driver.get('https://the-internet.herokuapp.com/exit_intent');

        await driver.sleep(4000);

        await driver.executeScript(
            '_ouibounce.fire();');

        await driver.sleep(1000);

        //verify modal window
        var modal_window_title = await driver.findElement(By.css("div[class='modal'] > div[class='modal-title'] > h3")).getText();

        await modal_window_title.should.equal("THIS IS A MODAL WINDOW");

        var modal_window_paragraph = await driver.findElement(By.css("div[class='modal'] > div[class='modal-body'] > p")).getText();

        await modal_window_paragraph.should.equal("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something).");

        //close modal window
        await driver.findElement(By.css("div[class='modal'] > div[class='modal-footer'] > p")).click();

    });
     
});

