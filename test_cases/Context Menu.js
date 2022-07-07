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


describe("REGR_Context Menu", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-12, verify title and intro text", async function(){

        await driver.get('https://the-internet.herokuapp.com/context_menu');

        var title = await driver.findElement(By.css("h3")).getText();

        await title.should.equal("Context Menu");

        var paragraph1 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[1]")).getText(); 

        await paragraph1.should.equal("Context menu items are custom additions that appear in the right-click menu.");

        var paragraph2 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[2]")).getText(); 

        await paragraph2.should.equal("Right-click in the box below to see one called 'the-internet'. When you click it, it will trigger a JavaScript alert.");

    });

    it("TC-13, verify context menu opens on right click and closes on ok click", async function(){

        await driver.get('https://the-internet.herokuapp.com/context_menu');

        var click_box = await driver.findElement(By.css("div[id='hot-spot']"));

        await driver.actions({bridge: false})                       
            .contextClick( click_box, webdriver.Button.RIGHT).perform();


        await driver.wait(until.alertIsPresent());

        let alert = await driver.switchTo().alert();

        let alert_text = await driver.switchTo().alert().getText();

        await alert_text.should.equal("You selected a context menu");
        
        await alert.accept();

        await driver.sleep(1000);

    });
    
    it("TC-14, verify context menu does not open on multiple left clicks", async function(){

        await driver.get('https://the-internet.herokuapp.com/context_menu');

        var click_box = await driver.findElement(By.css("div[id='hot-spot']"));

        await click_box.click();
        await click_box.click();
        await click_box.click();
        await click_box.click();
        
        await driver.sleep(2000);
        
        var alert_text = '';
        try{
            await driver.switchTo().alert();
            alert_text = await driver.switchTo().alert().getText();
            
        }
        catch(e){
            alert_text = '';
        }

        await alert_text.should.not.equal("You selected a context menu");

    });
    
});
