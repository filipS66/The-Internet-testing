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


describe("REGR_Broken Image", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-8, verify all images on page are diplayed as expected.", async function(){
 
        await driver.get('https://the-internet.herokuapp.com/broken_images');

        var all_imgs = await driver.findElements( By.css("img") );
        
        var img_src = [];
        for (var i = 0; i < all_imgs.length; i++){
            await all_imgs[i].getAttribute("src").then( img_txt => {
                img_src.push( img_txt );
                return img_txt;
            });
        };

        var img_nat_width = [];
        let img_width = "";
        for (var i = 0; i < all_imgs.length; i++){
            await all_imgs[i].getAttribute("naturalWidth").then( img_width => {
                img_nat_width.push( img_width );
                return img_width;
            });
        };


        for(var i = 0; i < img_src.length; i++){//if naturalWidth attribute is 0 that means image is broken
           
            if( img_nat_width[i] == 0 ){
                console.log("WARNING: image is broken: ", img_src[i] );
            }
         
        };

        expect(img_nat_width).to.be.an('array').that.does.not.include('0');

    });

});