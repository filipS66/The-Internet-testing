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



describe("REGR_Entry Ad", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-31, verify title and description, modal window txt, close button. After refresh modal window is not expected to re-open.", async function(){

        await driver.get('https://the-internet.herokuapp.com/entry_ad');

        await driver.sleep(4000);

        //verify modal window
        var modal_window_title = await driver.findElement(By.css("div[class='modal'] > div[class='modal-title'] > h3")).getText();

        await modal_window_title.should.equal("THIS IS A MODAL WINDOW");

        var modal_window_paragraph = await driver.findElement(By.css("div[class='modal'] > div[class='modal-body'] > p")).getText();

        await modal_window_paragraph.should.equal("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).");


        //close modal window
        await driver.findElement(By.css("div[class='modal'] > div[class='modal-footer'] > p")).click();

        //modal window element is not displayed but exists after closing
        var modal_window_is_hidden = await driver.findElement(By.css("div[id='modal']")).getAttribute("style");//getAttribute is used becaue element is not displayed

        await modal_window_is_hidden.should.equal("display: none;");

        //refresh page
        await driver.navigate().refresh();
        await driver.navigate().refresh();
        await driver.navigate().refresh();
        await driver.navigate().refresh();

        //after page refresh modal window is still not visible
        modal_window_is_hidden = await driver.findElement(By.css("div[id='modal']")).getAttribute("style");//getAttribute is used becaue element is not displayed

        await modal_window_is_hidden.should.equal("display: none;");


        //verify title
        var title = await driver.findElement(By.xpath("/html/body/div[2]/div/div/h3")).getText(); 

        await title.should.equal("Entry Ad");

        //verify paragraph 1
        var p1 = await driver.findElement(By.xpath("//*[@id='content']/div/p[1]")).getText(); 
        
        await p1.should.equal("Displays an ad on page load.");


        //verify paragraph 2
        var p2 = await driver.findElement(By.xpath("//*[@id='content']/div/p[2]")).getText(); 
        
        await p2.should.equal("If closed, it will not appear on subsequent page loads.");


        //verify paragraph 3
        var p3 = await driver.findElement(By.xpath("//*[@id='content']/div/p[3]")).getText(); 
        
        await p3.should.equal("To re-enable it, click here.");

        //------------------------------------------------------------------------------------------------------------
        //re-enable entry ad link, clcik on link doesn't. workround
        await driver.executeScript(
            'showAd();');

        //after click on re-enable link modal window is displayed again without issues

        await driver.sleep(2000);

        //verify modal window
        modal_window_title = await driver.findElement(By.css("div[class='modal'] > div[class='modal-title'] > h3")).getText();

        await modal_window_title.should.equal("THIS IS A MODAL WINDOW");

        modal_window_paragraph = await driver.findElement(By.css("div[class='modal'] > div[class='modal-body'] > p")).getText();

        await modal_window_paragraph.should.equal("It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).");


        //close modal window
        await driver.findElement(By.css("div[class='modal'] > div[class='modal-footer'] > p")).click();

        //modal window element is not displayed but exists after closing
        modal_window_is_hidden = await driver.findElement(By.css("div[id='modal']")).getAttribute("style");//getAttribute is used becaue element is not displayed

        await modal_window_is_hidden.should.equal("display: none;");

        //refresh page
        await driver.navigate().refresh();
        await driver.navigate().refresh();
        await driver.navigate().refresh();
        await driver.navigate().refresh();

        //after page refresh modal window is still not visible
        modal_window_is_hidden = await driver.findElement(By.css("div[id='modal']")).getAttribute("style");//getAttribute is used becaue element is not displayed

        await modal_window_is_hidden.should.equal("display: none;");


        //verify title
        title = await driver.findElement(By.xpath("/html/body/div[2]/div/div/h3")).getText(); 

        await title.should.equal("Entry Ad");

        //verify paragraph 1
        p1 = await driver.findElement(By.xpath("//*[@id='content']/div/p[1]")).getText(); 
        
        await p1.should.equal("Displays an ad on page load.");


        //verify paragraph 2
        p2 = await driver.findElement(By.xpath("//*[@id='content']/div/p[2]")).getText(); 
        
        await p2.should.equal("If closed, it will not appear on subsequent page loads.");


        //verify paragraph 3
        p3 = await driver.findElement(By.xpath("//*[@id='content']/div/p[3]")).getText(); 
        
        await p3.should.equal("To re-enable it, click here.");

        driver.sleep(3000);

    });
    
});

