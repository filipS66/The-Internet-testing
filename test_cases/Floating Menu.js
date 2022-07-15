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



describe("REGR_Floating Menu", async function(){
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    //page content occasionally changes. TC is generic
    it("TC-36, verify Floating Menu", async function(){

        await driver.get('https://the-internet.herokuapp.com/floating_menu');

        //verify title ans description paragraph
        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Floating Menu");

        var paragraphs = await driver.findElements(By.css("div[class='scroll large-10 columns large-centered'] > p"));

        paragraphs.should.have.lengthOf(10);

        var menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 0px;');

        await driver.executeScript(
            "window.scrollBy(0,350)", "");

        paragraphs = await driver.findElements(By.css("div[class='scroll large-10 columns large-centered'] > p"));

        paragraphs.should.have.lengthOf(10);

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 312.6px;');

        await driver.executeScript(
            "window.scrollBy(0,350)", "");//scroll

        paragraphs = await driver.findElements(By.css("div[class='scroll large-10 columns large-centered'] > p"));

        paragraphs.should.have.lengthOf(10);

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 662.6px;');

        await driver.executeScript(
            "window.scrollBy(0,350)", "");//scroll

        paragraphs = await driver.findElements(By.css("div[class='scroll large-10 columns large-centered'] > p"));

        paragraphs.should.have.lengthOf(10);

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 1012.6px;');

        //click home button
        await driver.findElement(By.css("a[href='#home']")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal('https://the-internet.herokuapp.com/floating_menu#home');

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 1012.6px;');

        await driver.executeScript(
            "window.scrollBy(0,350)", "");//scroll

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 1362.6px;');

        await driver.findElement(By.css("a[href='#news']")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal('https://the-internet.herokuapp.com/floating_menu#news');

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 1362.6px;');

        await driver.executeScript(
            "window.scrollBy(0,-350)", "");//scroll up

        await driver.findElement(By.css("a[href='#contact']")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 
    
        current_url.should.equal('https://the-internet.herokuapp.com/floating_menu#contact');

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 1012.6px;');

        await driver.executeScript(
            "window.scrollBy(0,-350)", "");//scroll up

        await driver.findElement(By.css("a[href='#about']")).click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 
    
        current_url.should.equal('https://the-internet.herokuapp.com/floating_menu#about');

        menu_position = await driver.findElement(By.css("div[id='menu']")).getAttribute('style');

        menu_position.should.equal('top: 662.6px;');

    });
    
});

