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





describe("REGR_JQueryUI - Menu", async function(){

    var driver;



    afterEach(function() {
        driver.quit();
    });
    
    it("TC-56, verify text on main page as well as text in menu ,including submenu's, and Back to JQuery UI link", async function(){

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        //required fr file download
        const checkExistsWithTimeout = require('./waitForFileExists.js');

        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')

        await driver.sleep(2000);

        await driver.get('https://the-internet.herokuapp.com/jqueryui/menu');

        var title = await driver.findElement(By.css("#content > div > h3")).getText();

        await title.should.equal("JQueryUI - Menu");

        driver.sleep(2000);

        var description = await driver.findElement(By.css("#content > div > div > p:nth-child(1)")).getText();

        await description.should.equal("JQuery UI Menus are a nice UI element from a user perspective, but poses an interesting automation challenge since it requires mouse operations and synchronization between them.");

        var description_1 = await driver.findElement(By.css("#content > div > div > p:nth-child(2)")).getText();

        await description_1.should.equal("Another 'fun' aspect is that the visibility of elements is actually not in the html itself, but done magically by JQuery so you cannot trust exactly what the html is telling you. A user cannot fire click events at certain UI elements, but you might -- if you have a big enough hammer to hit it with.");

        var disabled_txt = await driver.findElement(By.css("#ui-id-1 > a")).getText();

        await disabled_txt.should.equal("Disabled");

        var enabled_txt = await driver.findElement(By.css("#ui-id-3 > a")).getText();

        await enabled_txt.should.equal("Enabled");

        var enabled = await driver.findElement(By.css("#ui-id-3 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:enabled,x:0,y:0}).perform();

        driver.sleep(2000);

        await driver.findElement(By.css("#ui-id-3 > a")).click();

        var back_to = await driver.findElement(By.css("#ui-id-8 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:back_to,x:0,y:0}).perform();

        var enabled_children = await driver.findElement(By.css("#ui-id-3 > ul")).getText();

        await enabled_children.should.equal("Downloads\nBack to JQuery UI");

        await driver.findElement(By.css("#ui-id-4 > a")).click();

        var downloads_ = await driver.findElement(By.css("#ui-id-4 > a"));

        await actions.move({duration:5000,origin:downloads_,x:0,y:0}).perform();

        driver.sleep(2000);

        await driver.findElement(By.css("#ui-id-4 > a")).click();

        var downloads_children = await driver.findElement(By.css("#ui-id-4 > ul")).getText();

        await downloads_children.should.equal("PDF\nCSV\nExcel");

        
        driver.sleep(5000);
        
        await driver.findElement(By.css("#ui-id-5 > a")).click();

        driver.sleep(5000);

        var downloadHref = await driver.findElement(By.css("#ui-id-5 > a")).getAttribute("href");

        var downloadUrl = new URL(downloadHref);

        var fullPath = downloadUrl.pathname;

        var splitPath = fullPath.split("/");

        var fileName = splitPath.splice(-1)[0];

        var filePath = path.join("C:/Users/" + user_name + "/Downloads", fileName);

        console.log("Last processed file: filePath: ", filePath);

        await checkExistsWithTimeout(filePath, 60000);

        driver.sleep(2000); 
        
        await driver.quit();
    });
    
    it("TC-57, verify that number > 0 can be inserted and that number can be reduced with arrows", async function(){
            
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        //required fr file download
        const checkExistsWithTimeout = require('./waitForFileExists.js');

        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')


        await driver.get('https://the-internet.herokuapp.com/jqueryui/menu');

        var enabled = await driver.findElement(By.css("#ui-id-3 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:enabled,x:0,y:0}).perform();

        driver.sleep(2000);

        await driver.findElement(By.css("#ui-id-3 > a")).click();

        driver.sleep(2000);

        //await downloads_txt.should.equal("Downloads");

        var back_to = await driver.findElement(By.css("#ui-id-8 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:back_to,x:0,y:0}).perform();

     
        driver.sleep(2000);

        await driver.findElement(By.css("#ui-id-4 > a")).click();

        driver.sleep(2000);

        var downloads_ = await driver.findElement(By.css("#ui-id-4 > a"));

        await actions.move({duration:5000,origin:downloads_,x:0,y:0}).perform();

  

        //link in grandkid menu - file verification - PDF 

        driver.sleep(2000);

        await driver.findElement(By.css("#ui-id-5 > a")).click();//PDF

        driver.sleep(5000);

        var current_url = await driver.getCurrentUrl().then(url => {
            return url;
        }); 

        current_url.should.equal("https://the-internet.herokuapp.com/jqueryui/menu#");

        driver.sleep(2000);

        var downloadHref = await driver.findElement(By.css("#ui-id-7 > a") ).getAttribute("href");

        var downloadUrl = new URL(downloadHref);

        var fullPath = downloadUrl.pathname;

        var splitPath = fullPath.split("/");

        var fileName = splitPath.splice(-1)[0];

        var filePath = path.join("C:/Users/" + user_name + "/Downloads", fileName);

        console.log("Last processed file: filePath: ", filePath);

        await checkExistsWithTimeout(filePath, 60000);

        driver.sleep(2000); 

        await driver.quit();
    });
    
    
    
    it("TC-58, verify CSV link in GK submenu ", async function(){
            
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        //required fr file download
        const checkExistsWithTimeout = require('./waitForFileExists.js');

        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')

        await driver.get('https://the-internet.herokuapp.com/jqueryui/menu');

        var enabled = await driver.findElement(By.css("#ui-id-3 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:enabled,x:0,y:0}).perform();

        driver.sleep(1000);

        await driver.findElement(By.css("#ui-id-3 > a")).click();


        //await downloads_txt.should.equal("Downloads");

        var back_to = await driver.findElement(By.css("#ui-id-8 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:back_to,x:0,y:0}).perform();

     

        await driver.findElement(By.css("#ui-id-4 > a")).click();

        var downloads_ = await driver.findElement(By.css("#ui-id-4 > a"));

        await actions.move({duration:5000,origin:downloads_,x:0,y:0}).perform();

  

        //link in grandkid menu - file verification - csv

        await driver.findElement(By.css("#ui-id-6 > a")).click();

        driver.sleep(5000);

        var downloadHref = await driver.findElement(By.css("#ui-id-6 > a")).getAttribute("href");

        var downloadUrl = new URL(downloadHref);

        var fullPath = downloadUrl.pathname;

        var splitPath = fullPath.split("/");

        var fileName = splitPath.splice(-1)[0];

        var filePath = path.join("C:/Users/" + user_name + "/Downloads", fileName);

        console.log("Last processed file: filePath: ", filePath);

        await checkExistsWithTimeout(filePath, 60000);

        driver.sleep(2000); 

        await driver.quit();

    });
    
    it("TC-59, verify excel link in GK submenu ", async function(){

        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();

        //required fr file download
        const checkExistsWithTimeout = require('./waitForFileExists.js');

        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')


        await driver.get('https://the-internet.herokuapp.com/jqueryui/menu');

        var enabled = await driver.findElement(By.css("#ui-id-3 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:enabled,x:0,y:0}).perform();

        driver.sleep(1000);

        await driver.findElement(By.css("#ui-id-3 > a")).click();


        //await downloads_txt.should.equal("Downloads");

        var back_to = await driver.findElement(By.css("#ui-id-8 > a"));

        var actions = driver.actions({bridge: true});
        await actions.move({duration:5000,origin:back_to,x:0,y:0}).perform();

     

        await driver.findElement(By.css("#ui-id-4 > a")).click();

        var downloads_ = await driver.findElement(By.css("#ui-id-4 > a"));

        await actions.move({duration:5000,origin:downloads_,x:0,y:0}).perform();

  

        //link in grandkid menu - file verification - excel
        
        await driver.findElement(By.css("#ui-id-7 > a")).click();

        driver.sleep(5000);//wait for download

        
        var downloadHref = await driver.findElement(By.css("#ui-id-7 > a")).getAttribute("href");

        var downloadUrl = new URL(downloadHref);

        var fullPath = downloadUrl.pathname;

        var splitPath = fullPath.split("/");

        var fileName = splitPath.splice(-1)[0];

        var filePath = path.join("C:/Users/" + user_name + "/Downloads", fileName);

        console.log("Last processed file: filePath: ", filePath);

        await checkExistsWithTimeout(filePath, 60000);

        driver.sleep(2000);

        await driver.quit();
        
    });
    
});

