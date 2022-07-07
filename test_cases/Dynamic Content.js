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


describe("REGR_Dynamic Content", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-22, verify title and description", async function(){

        await driver.get('https://the-internet.herokuapp.com/dynamic_content');

        //verify title
        var title = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 

        await title.should.equal("Dynamic Content");

        var paragraph_1 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[1]")).getText(); 

        await paragraph_1.should.equal("This example demonstrates the ever-evolving nature of content by loading new text and images on each page refresh.");

        var paragraph_2 = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[2]")).getText(); 

        await paragraph_2.should.equal("To make some of the content static append ?with_content=static or click here.");

    });
    
    
    it("TC-23, verify section with images and paragraphs below description doesn't brake after refresh and content change.", async function(){
         
        await driver.get('https://the-internet.herokuapp.com/dynamic_content');


        for (let i = 0; i < 5; i++){

            var content_rows = await driver.findElements(By.css("div.large-10:nth-child(1) > div"));//numder of rows in content section

            expect(content_rows).to.have.lengthOf(3)


            var content_row_1_img = await driver.findElements(By.css("div.large-10:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img"));//numder of rows in content section

            expect(content_row_1_img).to.have.lengthOf(1)

            var content_row_1_p = await driver.findElement(By.css("#content > div:nth-child(1) > div.large-10.columns")).getText();

            expect(content_row_1_p).to.have.lengthOf.at.least(2)


            var content_row_2_img = await driver.findElements(By.css("div.row:nth-child(4) > div:nth-child(1) > img"));//numder of rows in content section

            expect(content_row_2_img).to.have.lengthOf(1)

            var content_row_2_p = await driver.findElement(By.css("#content > div:nth-child(4) > div.large-10.columns")).getText();

            expect(content_row_2_p).to.have.lengthOf.at.least(2)


            var content_row_3_img = await driver.findElements(By.css("div.row:nth-child(4) > div:nth-child(1) > img"));//numder of rows in content section

            expect(content_row_3_img).to.have.lengthOf(1)

            var content_row_3_p = await driver.findElement(By.css("#content > div:nth-child(7) > div.large-10.columns")).getText();

            expect(content_row_3_p).to.have.lengthOf.at.least(2)


            await driver.navigate().refresh();//verify site does not break after refresh and content update


        };
    
    });
    
});

