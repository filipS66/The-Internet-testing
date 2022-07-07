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





describe("REGR_Sortable Data Tables", async function(){
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-75, verifty Data Tables are properly sortable - table 1", async function(){

        //iteration 1
        await driver.get('https://the-internet.herokuapp.com/tables');

        await driver.sleep(1000);

        var title = await driver.findElement(By.css('#content > div > h3')).getText(); 

        await title.should.equal("Data Tables");

        var table_1_initial = await driver.findElement(By.css('#table1')).getText();

        await table_1_initial.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete");


        //sort by last name
        await driver.findElement(By.css('#table1 > thead > tr > th:nth-child(1) > span')).click();

        var table_1_lastName = await driver.findElement(By.css('#table1')).getText();

        await table_1_lastName.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete\n" +
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete");  

        //sort by name
        await driver.findElement(By.css('#table1 > thead > tr > th:nth-child(2) > span')).click();

        var table_1_name = await driver.findElement(By.css('#table1')).getText();

        await table_1_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        );  

        //sort by email
        await driver.findElement(By.css('#table1 > thead > tr > th:nth-child(3) > span')).click();

        var table_1_name = await driver.findElement(By.css('#table1')).getText();

        await table_1_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        ); 

        //sort by due
        await driver.findElement(By.css('#table1 > thead > tr > th:nth-child(4) > span')).click();

        var table_1_name = await driver.findElement(By.css('#table1')).getText();

        await table_1_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete"
        ); 


        //sort by website
        await driver.findElement(By.css('#table1 > thead > tr > th:nth-child(5) > span')).click();

        var table_1_name = await driver.findElement(By.css('#table1')).getText();

        await table_1_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        ); 
        
    });



    it("TC-76, verifty Data Tables are properly sortable - table 2", async function(){

        //iteration 1
        await driver.get('https://the-internet.herokuapp.com/tables');

        await driver.sleep(1000);

        var title = await driver.findElement(By.css('#content > div > h3')).getText(); 

        await title.should.equal("Data Tables");




        var table_initial = await driver.findElement(By.css('#table2')).getText();

        await table_initial.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete");

        
        //sort by last name
        await driver.findElement(By.css('#table2 > thead > tr > th:nth-child(1) > span')).click();

        var table_lastName = await driver.findElement(By.css('#table2')).getText();

        await table_lastName.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete\n" +
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete");  
        
        //sort by name
        await driver.findElement(By.css('#table2 > thead > tr > th:nth-child(2) > span')).click();

        var table_name = await driver.findElement(By.css('#table2')).getText();

        await table_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        );  
        
        //sort by email
        await driver.findElement(By.css('#table2 > thead > tr > th:nth-child(3) > span')).click();

        var table_name = await driver.findElement(By.css('#table2')).getText();

        await table_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        ); 

        //sort by due
        await driver.findElement(By.css('#table2 > thead > tr > th:nth-child(4) > span')).click();

        var table_name = await driver.findElement(By.css('#table2')).getText();

        await table_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete"
        ); 


        //sort by website
        await driver.findElement(By.css('#table2 > thead > tr > th:nth-child(5) > span')).click();

        var table_name = await driver.findElement(By.css('#table2')).getText();

        await table_name.should.equal("Last Name First Name Email Due Web Site Action\n" + 
        "Bach Frank fbach@yahoo.com $51.00 http://www.frank.com edit delete\n" + 
        "Doe Jason jdoe@hotmail.com $100.00 http://www.jdoe.com edit delete\n" + 
        "Smith John jsmith@gmail.com $50.00 http://www.jsmith.com edit delete\n" +
        "Conway Tim tconway@earthlink.net $50.00 http://www.timconway.com edit delete"
        ); 
        
   
    });
    
});

