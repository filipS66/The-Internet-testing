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


describe("REGR_Disappearing Elements", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-18, verify title, text and number of buttons that changes with each refresh.", async function(){
          
        await driver.get('https://the-internet.herokuapp.com/disappearing_elements');

        var title = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 

        await title.should.equal("Disappearing Elements");

        var paragraph_congrats = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[1]")).getText(); 

        await paragraph_congrats.should.equal("This example demonstrates when elements on a page change by disappearing/reappearing on each page load.");

        var verify_n_buttons_exists = await driver.findElement(By.css('ul')).findElements(By.css("a"));

        await verify_n_buttons_exists.should.have.lengthOf.within(4,5);

        //verify change in number of buttons after refresh. Should be different
        await driver.navigate().refresh();
        await driver.sleep(1000);

        var verify_n_buttons_exists_1 = await driver.findElement(By.css('ul')).findElements(By.css("a"));

        await verify_n_buttons_exists_1.length.should.not.equal(verify_n_buttons_exists.length);//BUG i guess

    });

    

    it("TC-19, verify all buttons are working properly.", async function(){
    
        await driver.get('https://the-internet.herokuapp.com/disappearing_elements');

        var verify_all_buttons_exist = [];

        //keep refreshing until the number of button's equals 5
        while( verify_all_buttons_exist.length != 5 ){
            await driver.navigate().refresh();
            await driver.sleep(500);
            verify_all_buttons_exist = await driver.findElement(By.css('ul')).findElements(By.css("a"));
        };
        
        //verify home button
        var home_button = await driver.findElement(By.css("a[href='/']")).then( function(v) {
            return v;
        });;

        var home_button_text = await home_button.getText();
        home_button_text.should.equal("Home");

        await home_button.click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/");

        verify_all_buttons_exist = [];
        while( verify_all_buttons_exist.length != 5 ){
            await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
            await driver.sleep(500);
            verify_all_buttons_exist = await driver.findElement(By.css('ul')).findElements(By.css("a"));
        };
        //verify About button
        var about_button = await driver.findElement(By.css("a[href='/about/']")).then( function(v) {
            return v;
        });;

        var about_button_text = await about_button.getText();
        about_button_text.should.equal("About");

        await about_button.click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/about/");

        var about_title = await driver.findElement(By.css("h1")).getText(); 


        verify_all_buttons_exist = [];
        while( verify_all_buttons_exist.length != 5 ){
            await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
            await driver.sleep(500);
            verify_all_buttons_exist = await driver.findElement(By.css('ul')).findElements(By.css("a"));
        };//return to disappearing_elements
        //verify Contact Us button
        var contact_button = await driver.findElement(By.css("a[href='/contact-us/']")).then( function(v) {
            return v;
        });;

        var contact_button_text = await contact_button.getText();
        contact_button_text.should.equal("Contact Us");

        await contact_button.click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/contact-us/");

        var contact_title = await driver.findElement(By.css("h1")).getText(); 

        verify_all_buttons_exist = [];
        while( verify_all_buttons_exist.length != 5 ){
            await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
            await driver.sleep(500);
            verify_all_buttons_exist = await driver.findElement(By.css('ul')).findElements(By.css("a"));
        };//return to disappearing_elements
        //verify Potfolio button
        var portfolio_button = await driver.findElement(By.css("a[href='/portfolio/']")).then( function(v) {
            return v;
        });;

        var portfolio_button_text = await portfolio_button.getText();
        portfolio_button_text.should.equal("Portfolio");

        await portfolio_button.click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/portfolio/");

        var portfolio_title = await driver.findElement(By.css("h1")).getText(); 

        verify_all_buttons_exist = [];
        while( verify_all_buttons_exist.length != 5 ){
            await driver.get('https://the-internet.herokuapp.com/disappearing_elements')
            await driver.sleep(500);
            verify_all_buttons_exist = await driver.findElement(By.css('ul')).findElements(By.css("a"));
        };//return to disappearing_elements
        //verify Gallery button
        var gallery_button = await driver.findElement(By.css("a[href='/gallery/']")).then( function(v) {
            return v;
        });;

        var gallery_button_text = await gallery_button.getText();
        gallery_button_text.should.equal("Gallery");

        await gallery_button.click();

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/gallery/");

        var gallery_title = await driver.findElement(By.css("h1")).getText(); 

        await gallery_title.should.not.equal("Not Found");//BUG


        await driver.sleep(2000);
        
    });
    
});
