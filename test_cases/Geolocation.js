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




describe("REGR_Geolocation", async function(){//known issue present, BUG filename

    var driver;


    after(async function() {
        await driver.quit();
    });
    
    it("TC-48, verify that Geolocation is not displayed on click if geolocation is not allowed in browser", async function(){

        var firefox = require('selenium-webdriver/firefox');

        const options = new firefox.Options();
        options.setPreference("geo.enabled", true);
        options.setPreference("geo.prompt.testing", true);
        options.setPreference("geo.prompt.testing.allow", false);

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        await driver.get('https://the-internet.herokuapp.com/geolocation');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Geolocation");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Click the button to get your current latitude and longitude");

        await driver.findElement(By.css("div[class='example'] > button")).click();

        description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Click the button to get your current latitude and longitude"); //no change after click

        await driver.quit();
    });
    
    it("TC-49, verify that Geolocation is displayed correctly on click", async function(){
        
        var firefox = require('selenium-webdriver/firefox');

        var options = new firefox.Options();
        options.setPreference("geo.enabled", true);
        options.setPreference("geo.prompt.testing", true);
        options.setPreference("geo.prompt.testing.allow", true);

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

            

        await driver.get('https://the-internet.herokuapp.com/geolocation');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Geolocation");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Click the button to get your current latitude and longitude");

        await driver.findElement(By.css("#content > div > button")).click();

        await driver.sleep(10000);

     
        //get location for verification
        const { Navigator } = require("node-navigator");
        const navigator = new Navigator();

        var Latitude = await driver.findElement(By.css("#lat-value")).getText();

        var Longitude = await driver.findElement(By.css("#long-value")).getText();
        
        const success = (position) => {            

            Number(Latitude).toFixed(0).should.equal(Number(position.latitude).toFixed(0)); //verify loaction, rounded, bug
            Number(Longitude).toFixed(0).should.equal(Number(position.longitude).toFixed(0)); //verify loaction, rounded, bug
        };

        const error = (error) => {
            console.log(error);
        };

        await navigator.getCurrentPosition(success, error);

        var google_maps_link_txt = await driver.findElement(By.css("div[id='map-link'] > a")).getText();

        var google_maps_link_href = await driver.findElement(By.css("div[id='map-link'] > a")).getAttribute('href');

        await google_maps_link_txt.should.equal("See it on Google");

        await google_maps_link_href.should.equal("http://maps.google.com/?q=" + Latitude + "," + Longitude + "");

    });
    
});

