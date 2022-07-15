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


describe("REGR_Frames", async function(){//known issue present, BUG filename
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-46, verify that site with nested frames works properly", async function(){

        await driver.get('https://the-internet.herokuapp.com/frames');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Frames");
     
        var li_list = await driver.findElements(By.css("ul > li"));

        li_list.should.have.lengthOf(2);//number of items in list

        var nested_frames_li = await driver.findElement(By.css("a[href='/nested_frames']")).getText();

        await nested_frames_li.should.equal("Nested Frames");

        await driver.findElement(By.css("a[href='/nested_frames']")).click();

        var frames_in_root_frameset = await driver.findElements(By.css("html > frameset > frame"));

        frames_in_root_frameset.should.have.lengthOf(2);//2 frames in root

        await driver.switchTo().frame(0); //switch to child top frame

        var frames_in_child1_frameset = await driver.findElements(By.css("html > frameset > frame"));

        frames_in_child1_frameset.should.have.lengthOf(3);//3 frames in top frame

        await driver.switchTo().frame(0); //switch to grandkid1 frame of child1 frame (LEFT)

        var child1_grandkid1_frame = await driver.findElement(By.css("html > body")).getText();

        child1_grandkid1_frame.should.equal("LEFT");

        await driver.switchTo().defaultContent(); //back to root frame

        await driver.switchTo().frame(0); //switch to child1 top frame

        await driver.switchTo().frame(1); //switch to grandkid2 frame of child1 frame (MIDDLE)

        var child1_grandkid2_frame = await driver.findElement(By.css("html > body")).getText();

        child1_grandkid2_frame.should.equal("MIDDLE");

        await driver.switchTo().defaultContent(); //back to root frame

        await driver.switchTo().frame(0); //switch to child1 top frame

        await driver.switchTo().frame(2); //switch to grandkid3 frame of child1 frame (RIGHT)

        var child1_grandkid3_frame = await driver.findElement(By.css("html > body")).getText();

        child1_grandkid3_frame.should.equal("RIGHT");

        await driver.switchTo().defaultContent(); //back to root frame

        await driver.switchTo().frame(1); //switch to child2 bottom frame

        var child2_frame = await driver.findElement(By.css("html > body")).getText();

        child2_frame.should.equal("BOTTOM");
        
    });
    

    it("TC-47, verify that site with iFrames works properly", async function(){

        await driver.get('https://the-internet.herokuapp.com/frames');

        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("Frames");
     
        var li_list = await driver.findElements(By.css("ul > li"));

        li_list.should.have.lengthOf(2);//number of items in list

        var iframes_li = await driver.findElement(By.css("a[href='/iframe']")).getText();

        await iframes_li.should.equal("iFrame");

        await driver.findElement(By.css("a[href='/iframe']")).click();

        var title_iframe = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title_iframe.should.equal("An iFrame containing the TinyMCE WYSIWYG Editor");

        await driver.switchTo().frame(0); //switch to child frame

        var iframe_text = await driver.findElement(By.css("#tinymce > p")).getText();

        await iframe_text.should.equal("Your content goes here.");

        await driver.executeScript(
            "document.getElementById('tinymce').innerHTML = '200';" );//add some text to paragraph of TinyMCE Editor

        iframe_text = await driver.findElement(By.css("#tinymce > p")).getText();

        await iframe_text.should.equal("200");//verify text change

    });
    
});
