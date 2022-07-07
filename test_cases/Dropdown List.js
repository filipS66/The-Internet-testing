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


describe("REGR_Dropdown List", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-21, verify title and dropdown list.", async function(){

        await driver.get('https://the-internet.herokuapp.com/dropdown');

        //verify title
        var title = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 

        await title.should.equal("Dropdown List");

        //verify dropdown list
        var map = webdriver.promise.map;
        var dropdown_list_web_element = await driver.findElements(By.css("option"));
        dropdown_list = await map(dropdown_list_web_element, e => e.getText() )
            .then(function(values) {
                return values;
            });
           

        await dropdown_list_web_element.should.have.lengthOf(3);

        await dropdown_list[0].should.equal("Please select an option");
        
        await dropdown_list[1].should.equal("Option 1");

        await dropdown_list[2].should.equal("Option 2");

        //verify dropdown is clickable and that value changes
        await driver.findElement(By.css("select")).click();

        driver.sleep(3000);

        await driver.findElement(By.css("option[value='1']")).click();

        var option1 = await driver.findElement(By.css("option[value='1']"));

        var current_selected = await option1.getAttribute("selected").then( i => {
            return i;
        });

        await current_selected.should.equal('true');


        await driver.findElement(By.css("select")).click();

        driver.sleep(3000);

        await driver.findElement(By.css("option[value='2']")).click();

        var option2 = await driver.findElement(By.css("option[value='2']"));

        var current_selected = await option2.getAttribute("selected").then( i => {
            return i;
        });

        await current_selected.should.equal('true');
        
 
    });
    
});

