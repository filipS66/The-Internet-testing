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




describe("REGR_Secure File Download", async function(){
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-70, verify you cant download secure file without valid password ", async function(){

        
        await driver.get('https://a:a@the-internet.herokuapp.com/download_secure');

        try{
            await driver.getCurrentUrl();
        }catch(e){
            e.message.should.equal("Dismissed user prompt dialog: Ova web-stranica zahtijeva da se prijaviš.");
        }

      
    });
    
    
    it("TC-71, verify you cant download secure file without valid password ", async function(){


            await driver.get('https://admin:admin@the-internet.herokuapp.com/download_secure');
    
            var paragraph = await driver.findElement(By.css("#content > div > h3")).getText(); 
    
            await paragraph.should.equal("Secure File Downloader");

            var list = await driver.findElements(By.css("div[class='example'] > a"));
    
            await expect(list).to.have.length.above(4);
    
    
    });
    
});