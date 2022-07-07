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


describe("REGR_Dynamic Controls", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
     
    it("TC-24, verify title and description", async function(){

        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');

        //verify title
        var title = await driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/h4[1]")).getText(); 

        await title.should.equal("Dynamic Controls");

        var paragraph_1 = await driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/p")).getText(); 

        await paragraph_1.should.equal("This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.");

    });
    
    it("TC-25, verify Remove/add mechanism", async function(){
           
        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');

        //verify title
        var title = await driver.findElement(By.css("h4.subheader:nth-child(3)")).getText(); 

        await title.should.equal("Remove/add");

        
        //one checkbox exists
        var checkbox = await driver.findElements(By.css("div[id='checkbox']")); 

        expect(checkbox).to.have.lengthOf(1);

        //REMOVE
        //cick on remove button
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click(); 

        await driver.sleep(5000);//wait for checkbox to be removed

        var checkbox1 = await driver.findElements(By.css("div[id='checkbox']"));

        expect(checkbox1).to.have.lengthOf(0);//no checkboxes

        var remove_message = await driver.findElement(By.css("p[id='message']")).getText();//after removal massage is printed

        await remove_message.should.equal("It's gone!");

        //ADD
        //click on add button
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click();
        await driver.sleep(5000);//wait for checkbox to be added

        await driver.findElement(By.css("input[id='checkbox']")).click();

        //checkbox is back
        var checkbox2 = await driver.findElements(By.css("input[id='checkbox']"));

        expect(checkbox2).to.have.lengthOf(1);//no checkboxes


        //REMOVE
        //checkbox 3 is removed
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click();
        await driver.sleep(5000);//wait for checkbox to be removed

        var checkbox3 = await driver.findElements(By.css("form[id='checkbox-example'] > input"));

        

        expect(checkbox3).to.have.lengthOf(0);//no checkboxes

        var remove_message = await driver.findElement(By.css("p[id='message']")).getText();//after removal massage is printed

        await remove_message.should.equal("It's gone!");

        var num_of_divs = await driver.findElements(By.xpath("//div[contains(text(), ' A checkbox')]"));//number of 'A checkbox' labels
        
        expect(num_of_divs).to.have.lengthOf(1);//number of 'A checkbox' labels



        //ADD
        //click on add button
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click();
        await driver.sleep(5000);//wait for checkbox to be added

        //checkbox is back
        var checkbox4 = await driver.findElements(By.css("input[id='checkbox']"));

        expect(checkbox4).to.have.lengthOf(1);//no checkboxes


        //REMOVE
        //checkbox 3 is removed
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click();
        await driver.sleep(5000);//wait for checkbox to be removed

        var checkbox5 = await driver.findElements(By.css("form[id='checkbox-example'] > input"));

        expect(checkbox5).to.have.lengthOf(0);//no checkboxes

        var remove_message = await driver.findElement(By.css("p[id='message']")).getText();//after removal massage is printed

        await remove_message.should.equal("It's gone!");

        var num_of_divs = await driver.findElements(By.xpath("//div[contains(text(), ' A checkbox')]"));//number of 'A checkbox' labels
        
        expect(num_of_divs).to.have.lengthOf(2);//number of 'A checkbox' labels

    });
    
    it("TC-26, verify Enable/disable mechanism", async function(){

        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');

        //verify title
        var title = await driver.findElement(By.css("#content > div.example > h4:nth-child(8)")).getText(); 

        await title.should.equal("Enable/disable");

        var input1 = await driver.findElement(By.css("input[type='text']")).isEnabled();

        await expect( input1 ).to.be.false;//before button is pressed text input field is disabled.

        await driver.findElement(By.css("form[id='input-example'] > button")).click();

        await driver.sleep(5000);

        await driver.findElement(By.css("form[id='input-example'] > input")).click();
        await driver.findElement(By.css("form[id='input-example'] > input")).sendKeys("val");

        var message = await driver.findElement(By.css("p[id='message']")).getText();

        await message.should.equal("It's enabled!");


        //disable
        await driver.findElement(By.css("form[id='input-example'] > button")).click();

        await driver.sleep(5000);

        var message = await driver.findElement(By.css("p[id='message']")).getText();

        await message.should.equal("It's disabled!");

        driver.sleep(5000);

    });
   
    it("TC-27, verify Enable/disable mechanism after Remove/add mechanism has been used in the same driver instance", async function(){ //BUG present!!

        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');

        //verify title
        var title = await driver.findElement(By.css("h4.subheader:nth-child(3)")).getText(); 

        await title.should.equal("Remove/add");

        
        //one checkbox exists
        var checkbox = await driver.findElements(By.css("div[id='checkbox']")); 

        expect(checkbox).to.have.lengthOf(1);

        //REMOVE
        //cick on remove button
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click(); 

        await driver.sleep(5000);//wait for checkbox to be removed

        var checkbox1 = await driver.findElements(By.css("div[id='checkbox']"));

        expect(checkbox1).to.have.lengthOf(0);//no checkboxes

        var remove_message = await driver.findElement(By.css("p[id='message']")).getText();//after removal massage is printed

        await remove_message.should.equal("It's gone!");

        //ADD
        //click on add button
        await driver.findElement(By.css("form[id='checkbox-example'] > button")).click();
        await driver.sleep(5000);//wait for checkbox to be added

        await driver.findElement(By.css("input[id='checkbox']")).click();

        //checkbox is back
        var checkbox2 = await driver.findElements(By.css("input[id='checkbox']"));

        expect(checkbox2).to.have.lengthOf(1);//no checkboxes


        //VERIFICATION of enable/disable
        var input1 = await driver.findElement(By.css("input[type='text']")).isEnabled();

        await expect( input1 ).to.be.false;//before button is pressed text input field is disabled.

        await driver.findElement(By.css("form[id='input-example'] > button")).click();

        await driver.sleep(5000);

        await driver.findElement(By.css("form[id='input-example'] > input")).click();
        await driver.findElement(By.css("form[id='input-example'] > input")).sendKeys("val");

        var message = await driver.findElement(By.css("p[id='message']")).getText();

        await message.should.equal("It's enabled!");


        //disable
        await driver.findElement(By.css("form[id='input-example'] > button")).click();

        await driver.sleep(5000);

        var message = await driver.findElement(By.css("p[id='message']")).getText();

        await message.should.equal("It's disabled!");

        await driver.sleep(10000);

        var div_loading = await (await driver.findElements(By.css("form[id='input-example'] > div:not([style='display: none;'])")));

        console.log(div_loading);

        expect(div_loading).to.have.lengthOf(0);  //BUG

        driver.sleep(5000);

    });
    
});
