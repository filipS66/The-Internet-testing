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






describe("REGR_Inputs", async function(){
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-53, verify that number > 0 can be inserted and that number can be reduced with arrows", async function(){

        await driver.get('https://the-internet.herokuapp.com/inputs');

        var title = await driver.findElement(By.css("#content > div > div > h3")).getText();

        await title.should.equal("Inputs");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Number");

        var input_field = await driver.findElement(By.css("div[class='example'] > input"));

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys("1");

        var input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('1');

        await driver.findElement(By.css("div[class='example'] > input")).click();
        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('0');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('0');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await driver.sleep(2000);

        await input_field_value.should.equal('1');


    });
    
    it("TC-54, verify that number < 0 can be inserted and that number can be reduced with arrows", async function(){
            

        await driver.get('https://the-internet.herokuapp.com/inputs');

        var title = await driver.findElement(By.css("#content > div > div > h3")).getText();

        await title.should.equal("Inputs");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Number");

        var input_field = await driver.findElement(By.css("div[class='example'] > input"));

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys("-1");

        var input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).click();
        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('0');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-3');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-4');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-3');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await driver.sleep(2000);

        await input_field_value.should.equal('-1');


    });
    

    it("TC-55, verify that number == 0 can be inserted and that number can be reduced with arrows", async function(){

        await driver.get('https://the-internet.herokuapp.com/inputs');

        var title = await driver.findElement(By.css("#content > div > div > h3")).getText();

        await title.should.equal("Inputs");

        var description = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await description.should.equal("Number");

        var input_field = await driver.findElement(By.css("div[class='example'] > input"));

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys("0");

        var input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('0');

        await driver.findElement(By.css("div[class='example'] > input")).click();
        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('0');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_DOWN);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-3');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-2');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await input_field_value.should.equal('-1');

        await driver.findElement(By.css("div[class='example'] > input")).sendKeys(Key.ARROW_UP);

        input_field_value = await driver.findElement(By.css("div[class='example'] > input")).getAttribute('value');

        await driver.sleep(2000);

        await input_field_value.should.equal('0');

    });
    
});
