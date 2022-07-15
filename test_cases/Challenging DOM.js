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



describe("REGR_Challenging DOM", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    it("TC-9, verify all buttons work as expected in challenging DOM.", async function(){

        await driver.get('https://the-internet.herokuapp.com/challenging_dom');

        var title = await driver.findElement(By.css("h3")).getText();

        await title.should.equal("Challenging DOM");

        var paragraph = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/p[1]")).getText();//

        await paragraph.should.equal("The hardest part in automated web testing is finding the best locators (e.g., ones that well named, unique, and unlikely to change). It's more often than not that the application you're testing was not built with this concept in mind. This example demonstrates that with unique IDs, a table with no helpful locators, and a canvas element.");

        //----------------

        var blue_button = await driver.findElement(By.css("a[class='button']"));

        var blue_button_id0 = null;
        await blue_button.getAttribute("id").then( b => {
            blue_button_id0 = b;
            return b;
        });

        var red_button = await driver.findElement(By.css("a[class='button']"));

        var red_button_id0 = null;
        await red_button.getAttribute("id").then( b => {
            red_button_id0 = b;
            return b;
        });

        var green_button = await driver.findElement(By.css("a[class='button']")); 

        var green_button_id0 = null;
        await green_button.getAttribute("id").then( b => {
            green_button_id0 = b;
            return b;
        });
        
        //refresh page
        await driver.navigate().refresh();

        //get new id values
        blue_button = await driver.findElement(By.css("a[class='button']")); 

        var blue_button_id1 = null;
        await blue_button.getAttribute("id").then( b => {
            blue_button_id1 = b;
            return b;
        });


        await blue_button_id0.should.not.equal(blue_button_id1);



        red_button = await driver.findElement(By.css("a[class='button alert']")); 

        var red_button_id1 = null;
        await red_button.getAttribute("id").then( b => {
            red_button_id1 = b;
            return b;
        });

        await red_button_id0.should.not.equal(red_button_id1);
        

        green_button = await driver.findElement(By.css("a[class='button success']")); 

        var green_button_id1 = null;
        await green_button.getAttribute("id").then( b => {
            green_button_id1 = b;
            return b;
        });

        await green_button_id0.should.not.equal(green_button_id1);

    });


    it("TC-10, verify table is set as expected in challenging DOM.", async function(){

        await driver.get('https://the-internet.herokuapp.com/challenging_dom');

        //verify number of links on page
        var all_links = await driver.findElements( By.css("a") );
        await all_links.should.have.lengthOf(25);

        var table = null;
        table = await driver.findElement(By.css("table")).then( b => {
            return b;
        });

        //table header verification
        var map = webdriver.promise.map;

        var elements_header = null;
        elements_header = await driver.findElements(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/thead[1]/tr[1]"))
        var head = null;
        head = await map(elements_header, e => e.getText() )
            .then(function(values) {
                return values[0];
            });
    

        await head.should.equal('Lorem Ipsum Dolor Sit Amet Diceret Action');

        
        for(var i = 1; i < 11; i++){ //table has 10 rows

            elements_header = null;
            elements_header = await driver.findElements(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[" + String(i) + "]"))
            var row = null;
            row = await map(elements_header, e => e.getText() )
                .then(function(values) {
                    return values[0];
                });

                await row.should.equal('Iuvaret' + String(i-1) + ' Apeirian' + String(i-1) + ' Adipisci' + String(i-1) + ' Definiebas' + String(i-1) + ' Consequuntur' + String(i-1) + ' Phaedrum' + String(i-1) + ' edit delete');

        };

        //verify canvas
        var canvas = await driver.findElement(By.css("canvas[id='canvas']")); 
        await canvas.getAttribute("width").then( w => {
            canvas_width = w;
            return w;
        });

        await canvas.getAttribute("height").then( h => {
            canvas_height = h;
            return h;
        });

        await canvas.getAttribute("style").then( s => {
            canvas_style = s;
            return s;
        });

        await canvas_width.should.equal('599');
        await canvas_height.should.equal('200');
        await canvas_style.should.equal("border: 1px dotted;");

    });

});
