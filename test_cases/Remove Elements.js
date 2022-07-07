//User name on local machine. Example John's path to Downloads --> C:/Users/John/Downloads
const user_name = "Filip";
//-----------------------------------------------

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
    Key = webdriver.Key;

const { debug } = require('console');

//var firefox = require('selenium-webdriver/firefox');

var should = require('chai').should();
var expect = require('chai').expect;


describe("REGR_Add/Remove Elements", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-2, verif that one 'delete' button is added on 'Add Element' button click", async function(){
     
        await driver.get('http://the-internet.herokuapp.com/');

        await driver.findElement(By.css("a[href='/add_remove_elements/']")).click();
      
        var title_verifying = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/h3[1]")).getText(); 

        await title_verifying.should.equal("Add/Remove Elements");

        var verify_add_element_button = await driver.findElement(By.css("button[onclick='addElement()']")).getText();

        await verify_add_element_button.should.equal("Add Element");

        var add_element_button = await driver.findElement(By.css("button[onclick='addElement()']"));

        
        var varify_only_one_button_exists = await driver.findElements(By.css("button"));

        await varify_only_one_button_exists.should.have.lengthOf(1);

    })
    
    
    it("TC-3, verif that two 'delete' button's are added on two 'Add Element' button click's, and then verify button can be removed", async function(){

        await driver.get('http://the-internet.herokuapp.com/');

        await driver.findElement(By.css("a[href='/add_remove_elements/']")).click();
      
        var title_verifying = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/h3[1]")).getText(); 

        await title_verifying.should.equal("Add/Remove Elements");

        var verify_add_element_button = await driver.findElement(By.css("button[onclick='addElement()']")).getText();

        await verify_add_element_button.should.equal("Add Element");

        var add_element_button = await driver.findElement(By.css("button[onclick='addElement()']"));

        
        var varify_only_one_button_exists = await driver.findElements(By.css("button"));

        await varify_only_one_button_exists.should.have.lengthOf(1);

        
        await add_element_button.click();

        var varify_two_buttons_exists = await driver.findElements(By.css("button"));

        await varify_two_buttons_exists.should.have.lengthOf(2);



        await varify_two_buttons_exists[1].click(); //click second ,delete , button

        var varify_two_buttons_exists = await driver.findElements(By.css("button"));

        await varify_two_buttons_exists.should.have.lengthOf(1); //after one button is removed only one ,add, button remains 

               
        
    });
 
    it("TC-4, verif that multiple 'delete' button's are added on multiple 'Add Element' button click's, and then verify multiple button's can be removed", async function(){

        await driver.get('http://the-internet.herokuapp.com/');

        await driver.findElement(By.css("a[href='/add_remove_elements/']")).click();

        //click add button 3 times and verify mechanism
        var add_element_button = await driver.findElement(By.css("button[onclick='addElement()']"));
        await add_element_button.click();
        await add_element_button.click();
        await add_element_button.click();

        var varify_four_buttons_exists = await driver.findElements(By.css("button"));

        await varify_four_buttons_exists.should.have.lengthOf(4);

        
        //click add button 3 times and verify mechanism
        await varify_four_buttons_exists[3].click(); //click fourth ,delete , button
        await varify_four_buttons_exists[2].click(); //click third ,delete , button

        var varify_two_buttons_exists = await driver.findElements(By.css("button"));

        await varify_two_buttons_exists.should.have.lengthOf(2);
        
        //after removing two delete buttons add one and verify number of buttons is correct
        await add_element_button.click();

        var varify_three_buttons_exists = await driver.findElements(By.css("button"));

        await varify_three_buttons_exists.should.have.lengthOf(3);
 
    });
    
});   