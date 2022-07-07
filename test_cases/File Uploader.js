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

var firefox = require('selenium-webdriver/firefox');





describe("REGR_File Uploader", async function(){//known issue present, BUG filename
    
    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });

    //page content occasionally changes. TC is generic
    it("TC-34, verify that Choose File button works properly", async function(){

        const { Builder } = require("selenium-webdriver");

        const options = new firefox.Options();
        let profile = './selenium_profile';
        options.setProfile(profile);
        driver = new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        driver.sleep(4000);

        await driver.get('https://the-internet.herokuapp.com/upload');

        //verify title ans description paragraph
        var title = await driver.findElement(By.css("div[class='example'] > h3")).getText();

        await title.should.equal("File Uploader");

        var paragraph = await driver.findElement(By.css("div[class='example'] > p")).getText();

        await paragraph.should.equal("Choose a file on your system and then click upload. Or, drag and drop a file into the area below.");


        const file_name = ["person.png", "Lesson2.doc", "image.jpg", "Book1.xlsx", "bar.txt", "5mb script.xml"];

        for(var i = 0; i < file_name.length; i++){
            await driver.get('https://the-internet.herokuapp.com/upload');
            //upload file png
            var upload_element = await driver.findElement(By.css("input[id='file-upload']"));

            var location = __dirname;

            var file_path = String(location) + "\\test_files\\" + file_name[i];

            await driver.findElement(By.css("input[id='file-upload']")).sendKeys(file_path);
            
            await driver.findElement(By.css("input[id='file-submit']")).click();

            if(i == 5){
                await driver.sleep(100000); //sixth file takes longer to upload
            }

            //success page
            var title_success = await driver.findElement(By.css("div[class='example'] > h3")).getText();
            title_success.should.equal("File Uploaded!");

            var paragraph_success = await driver.findElement(By.css("div[class='example'] > div")).getText();
            paragraph_success.should.equal(file_name[i]);
        };
        
        driver.sleep(4000);

        driver.quit();

    });
    
    
    //page content occasionally changes. TC is generic
    it("TC-35, verify that Drop Box works properly", async function(){

        const { Builder } = require("selenium-webdriver");

        const options = new firefox.Options();
        let profile = './selenium_profile';
        options.setProfile(profile);
        driver = new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        driver.sleep(4000);

        await driver.get('https://the-internet.herokuapp.com/upload');


        JS_DROP_FILE = `
        var target = arguments[0],
            offsetX = arguments[1],
            offsetY = arguments[2],
            document = target.ownerDocument || document,
            window = document.defaultView || window;

        var input = document.createElement('INPUT');
        input.type = 'file';
        input.onchange = function () {
        var rect = target.getBoundingClientRect(),
            x = rect.left + (offsetX || (rect.width >> 1)),
            y = rect.top + (offsetY || (rect.height >> 1)),
            dataTransfer = { files: this.files };

        ['dragenter', 'dragover', 'drop'].forEach(function (name) {
            var evt = document.createEvent('MouseEvent');
            evt.initMouseEvent(name, !0, !0, window, 0, 0, 0, x, y, !1, !1, !1, !1, 0, null);
            evt.dataTransfer = dataTransfer;
            target.dispatchEvent(evt);
        });

        setTimeout(function () { document.body.removeChild(input); }, 25);
        };
        document.body.appendChild(input);
        return input;
        `
        var drop_target = await driver.findElement(By.css("div[id='drag-drop-upload']"));

        //----------------------------
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        var location = __dirname;
        var file_path = String(location) + "\\test_files\\person.png";
        
        await file_input.sendKeys(file_path);

        var drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(1);

        var drop_box_content_1 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[1]/div[1]/div/span")).getText();
        
        drop_box_content_1.should.equal("person.png");

        var drop_box_content_1_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[1]/div[2]/span")).getText();

        drop_box_content_1_check.should.equal("✔");
        //--------------------------
        
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        var location = __dirname;
        
        await file_input.sendKeys( String(location) + "\\test_files\\" + "Lesson2.doc");

        drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(2);

        drop_box_content_2 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[2]/div[1]/div/span")).getText();
        
        drop_box_content_2.should.equal("Lesson2.doc");

        drop_box_content_2_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[2]/div[2]/span")).getText();

        drop_box_content_2_check.should.equal("✔");

        //--------------------------
        
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        
        await file_input.sendKeys( String(location) + "\\test_files\\image.jpg");

        drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(3);

        drop_box_content_3 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[3]/div[1]/div/span")).getText();
        
        drop_box_content_3.should.equal("image.jpg");

        drop_box_content_3_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[3]/div[2]/span")).getText();

        drop_box_content_3_check.should.equal("✔");
        
        //--------------------------
        
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        var location = __dirname;

        var file_path = String(location) + "\\test_files\\" + "Book1.xlsx";

        await file_input.sendKeys( file_path );

        drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(4);

        drop_box_content_4 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[4]/div[1]/div/span")).getText();
        
        drop_box_content_4.should.equal("Book1.xlsx");

        drop_box_content_4_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[4]/div[2]/span")).getText();

        drop_box_content_4_check.should.equal("✔");

        //--------------------------
        
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        var location = __dirname;

        var file_path = String(location) + "\\test_files\\" + "bar.txt";

        await file_input.sendKeys( file_path );

        drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(5);

        drop_box_content_6 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[5]/div[1]/div/span")).getText();
        
        drop_box_content_6.should.equal("bar.txt");

        drop_box_content_6_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[5]/div[2]/span")).getText();

        drop_box_content_6_check.should.equal("✔");

        //--------------------------
        
        file_input = await driver.executeScript(
            JS_DROP_FILE, drop_target);

        var location = __dirname;

        var file_path = String(location) + "\\test_files\\" + "5mb script.xml";

        await file_input.sendKeys( file_path );

        drop_list = await driver.findElements(By.css("div[id='drag-drop-upload'] > div"));

        drop_list.should.have.lengthOf(6);

        drop_box_content_7 = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[6]/div[1]/div/span")).getText();
        
        drop_box_content_7.should.equal("5mb script.xml");

        drop_box_content_7_check = await driver.findElement(By.xpath("//*[@id='drag-drop-upload']/div[6]/div[2]/span")).getText();

        drop_box_content_7_check.should.equal("✔");
        
        driver.sleep(4000);
        
    });
    
});
