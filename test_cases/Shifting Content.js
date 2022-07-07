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




describe("REGR_Shifting Content", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-73, Shifting Content: Menu Element", async function(){//bug present

        await driver.get('https://the-internet.herokuapp.com/shifting_content/menu');

        await driver.sleep(5000);

        var title = await driver.findElement(By.xpath('//*[@id="content"]/div/h3')).getText();

        await title.should.equal("Shifting Content: Menu Element");


        await driver.findElement(By.css('#content > div > p:nth-child(4) > a')).click();



        var home = await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[1]/a')).getRect();

        var home_x = Number(home.x).toFixed(2);
        var home_y = Number(home.y).toFixed(2);
        var home_width = String( Number(home.width).toFixed(2) );
        var home_height = String( Number(home.height).toFixed(2) );

        await home_width.should.equal('90.03');
        await home_height.should.equal('52.00');


        var about = await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[2]/a')).getRect();

        var about_x = Number(about.x).toFixed(2);
        var about_y = Number(about.y).toFixed(2);
        var about_width = String( Number(about.width).toFixed(2) );
        var about_height = String( Number(about.height).toFixed(2) );

        await about_width.should.equal('89.05');
        await about_height.should.equal('52.00');

        //verify About button is not covering Home
        String(about_x).should.equal( String(Number(home.x + home.width).toFixed(2)) );




        var contact_us = await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[3]/a')).getRect();

        var contact_us_x = Number(contact_us.x).toFixed(2);
        var contact_us_y = Number(contact_us.y).toFixed(2);
        var contact_us_width = String( Number(contact_us.width).toFixed(2) );
        var contact_us_height = String( Number(contact_us.height).toFixed(2) );

        
        await contact_us_width.should.equal('131.05');
        await contact_us_height.should.equal('52.00');

    
        //verify About button is not covering Home
        String(contact_us_x).should.equal( String(Number(about.x + about.width).toFixed(2)) );




        var portfolio = await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[4]/a')).getRect();

        var portfolio_x = Number(portfolio.x).toFixed(2);
        var portfolio_y = Number(portfolio.y).toFixed(2);
        var portfolio_width = String( Number(portfolio.width).toFixed(2) );
        var portfolio_height = String( Number(portfolio.height).toFixed(2) );

        
        await portfolio_width.should.equal('108.05');
        await portfolio_height.should.equal('52.00');

    
        //verify Portfolio button is not covering Contact Us
        String(portfolio_x).should.equal( String(Number(contact_us.x + contact_us.width).toFixed(2)) );

        

        var gallery = await driver.findElement(By.xpath('//*[@id="content"]/div/ul/li[5]/a')).getRect();

        var gallery_x = Number(gallery.x).toFixed(2);
        var gallery_y = Number(gallery.y).toFixed(2);
        var gallery_width = String( Number(gallery.width).toFixed(2) );
        var gallery_height = String( Number(gallery.height).toFixed(2) );

        
        await gallery_width.should.equal('99.03');
        await gallery_height.should.equal('52.00');

    
        //verify Portfolio button is not covering Contact Us
        String(gallery_x).should.equal( String(Number(portfolio.x + portfolio.width).toFixed(2)) );


    });
    
    

    it("TC-74, Shifting Content: List", async function(){

        //iteration 1
        await driver.get('https://the-internet.herokuapp.com/shifting_content/list');

        await driver.sleep(1000);

        var title = await driver.findElement(By.xpath('//*[@id="content"]/div/h3')).getText(); 

        await title.should.equal("Shifting Content: List");

        var shifting_text = await driver.findElement(By.css('#content > div > div > div')).getText();

        expect( shifting_text ).to.contain("Important Information You're Looking For");

        expect( shifting_text ).to.contain("Et numquam et aliquam.");

        expect( shifting_text ).to.contain("Vel aliquid dolores veniam enim nesciunt libero quaerat.");

        expect( shifting_text ).to.contain("Sed deleniti blanditiis odio laudantium.");

        expect( shifting_text ).to.contain("Nesciunt autem eum odit fuga tempora deleniti.");


        //iteration 2
        await driver.get('https://the-internet.herokuapp.com/shifting_content/list');

        await driver.sleep(1000);

        var shifting_text = await driver.findElement(By.css('#content > div > div > div')).getText();

        expect( shifting_text ).to.contain("Important Information You're Looking For");

        expect( shifting_text ).to.contain("Et numquam et aliquam.");

        expect( shifting_text ).to.contain("Vel aliquid dolores veniam enim nesciunt libero quaerat.");

        expect( shifting_text ).to.contain("Sed deleniti blanditiis odio laudantium.");

        expect( shifting_text ).to.contain("Nesciunt autem eum odit fuga tempora deleniti.");


    });
    
});
