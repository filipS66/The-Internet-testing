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



describe("REGR_Dynamic Loading", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-28, verify title and description", async function(){
        
        await driver.get('https://the-internet.herokuapp.com/dynamic_loading');


        //verify title
        var title = await driver.findElement(By.xpath("/html/body/div[2]/div/div/h3")).getText(); 

        await title.should.equal("Dynamically Loaded Page Elements");

        //verify paragraph 1
        var p1 = await driver.findElement(By.xpath("//*[@id='content']/div/p[1]")).getText(); 
        
        await p1.should.equal("It's common to see an action get triggered that returns a result dynamically. It does not rely on the page to reload or finish loading. The page automatically gets updated (e.g. hiding elements, showing elements, updating copy, etc) through the use of JavaScript.");


        //verify paragraph 2
        var p2 = await driver.findElement(By.xpath("//*[@id='content']/div/p[2]")).getText(); 
        
        await p2.should.equal("There are two examples. One in which an element already exists on the page but it is not displayed. And anonther where the element is not on the page and gets added in.");

    });
    
    it("TC-29, verify Example 1: Element on page that is hidden", async function(){
          
        await driver.get('https://the-internet.herokuapp.com/dynamic_loading');


        //click example 1
        await driver.findElement(By.css("a[href='/dynamic_loading/1']")).click();

        //verify title 1
        var title_1 = await driver.findElement(By.css("#content > div > h3")).getText(); 

        await title_1.should.equal("Dynamically Loaded Page Elements");

        
        //verify title 2
        var title_2 = await driver.findElement(By.css("#content > div > h4")).getText(); 

        await title_2.should.equal("Example 1: Element on page that is hidden");

        //massage is not diplayed before click but element exists
        var message_before_loading = await driver.findElement(By.css("div[id='finish'] > h4")).getAttribute("textContent");//getAttribute is used becaue element is not displayed

        await message_before_loading.should.equal("Hello World!");



        //click example 1
        await driver.findElement(By.css("#start > button")).click();

        var message = await driver.findElement(By.css("div[class='example'] > div:not([style='display: none;'])")).getText();

        await message.should.equal("Loading...");

        await driver.sleep(5000);


        //verify titles are still properly displayed
        //verify title 1
        title_1 = await driver.findElement(By.css("#content > div > h3")).getText(); 

        await title_1.should.equal("Dynamically Loaded Page Elements");

        
        //verify title 2
        title_2 = await driver.findElement(By.css("#content > div > h4")).getText(); 

        await title_2.should.equal("Example 1: Element on page that is hidden");

        //massage is shown after loading
        var message_after_loading = await driver.findElement(By.css("div[id='finish'] > h4")).getText();

        await message_after_loading.should.equal("Hello World!");

    });
 
    it("TC-30, verify Example 2: Element rendered after the fact", async function(){
       
        await driver.get('https://the-internet.herokuapp.com/dynamic_loading');


        //click example 1
        await driver.findElement(By.css("a[href='/dynamic_loading/2']")).click();

        //verify title 1
        var title_1 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_1.should.equal("Dynamically Loaded Page Elements");

        
        //verify title 2
        var title_2 = await driver.findElement(By.css("#content > div > h4")).getText();

        await title_2.should.equal("Example 2: Element rendered after the fact");

        //element with Hello World text does not exist at this point
        var message_before_loading = await driver.findElements(By.css("div[id='finish'] > h4"));

        await expect(message_before_loading).to.have.lengthOf(0);



        //click example 1
        await driver.findElement(By.css("#start > button")).click();

        var message = await driver.findElement(By.css("div[class='example'] > div:not([style='display: none;'])")).getText();

        await message.should.equal("Loading...");

        await driver.sleep(5000);


        //verify titles are still properly displayed
        //verify title 1
        title_1 = await driver.findElement(By.css("#content > div > h3")).getText();

        await title_1.should.equal("Dynamically Loaded Page Elements");

        
        //verify title 2
        title_2 = await driver.findElement(By.css("#content > div > h4")).getText(); 

        await title_2.should.equal("Example 2: Element rendered after the fact");

        //massage is shown after loading
        var message_after_loading = await driver.findElement(By.css("div[id='finish'] > h4")).getText();

        await message_after_loading.should.equal("Hello World!");

        driver.sleep(5000);
    });
    

});

