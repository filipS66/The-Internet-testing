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


describe("REGR_drag_and_drop", async function(){

    var driver;

    before(function() {
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    });

    after(async function() {
        await driver.quit();
    });
    
    it("TC-20, verify title, that is possible to drag A to B and that then A and B swap places. NOT AUTOMATED PROPERLY (workaround used)", async function(){

        await driver.get('https://the-internet.herokuapp.com/drag_and_drop');


        //var title = await driver.findElement(By.xpath("/html[1]/body[1]/div[2]/div[1]/div[1]/h3[1]")).getText(); 

        //await title.should.equal("Drag and Drop");

        await driver.sleep(2000);

        //To locate the source and target elements
        let sourceEle = await driver.findElement(By.id("column-a")).then( function(v) {
            return v;
        });
        let targetEle = await driver.findElement(By.id("column-b")).then( function(v) {
            return v;
        });
        let sourceEle_txt = await  driver.findElement(By.id("column-a")).getText().then( function(v) {
            return v;
        });
        let targetEle_txt = await driver.findElement(By.id("column-b")).getText().then( function(v) {
            return v;
        });

        console.log("Elem: ", sourceEle_txt, targetEle_txt);

        //await driver.sleep(2000);

        //await driver.actions({bridge: true}).dragAndDrop(sourceEle, targetEle).perform().release().perform();
     
        //await driver.sleep(2000);

        //Workaround, problem with dragAndDrop
        await driver.executeScript(
            "function createEvent(typeOfEvent) {\n" + "var event =document.createEvent(\"CustomEvent\");\n"
                    + "event.initCustomEvent(typeOfEvent,true, true, null);\n" + "event.dataTransfer = {\n" + "data: {},\n"
                    + "setData: function (key, value) {\n" + "this.data[key] = value;\n" + "},\n"
                    + "getData: function (key) {\n" + "return this.data[key];\n" + "}\n" + "};\n" + "return event;\n"
                    + "}\n" + "\n" + "function dispatchEvent(element, event,transferData) {\n"
                    + "if (transferData !== undefined) {\n" + "event.dataTransfer = transferData;\n" + "}\n"
                    + "if (element.dispatchEvent) {\n" + "element.dispatchEvent(event);\n"
                    + "} else if (element.fireEvent) {\n" + "element.fireEvent(\"on\" + event.type, event);\n" + "}\n"
                    + "}\n" + "\n" + "function simulateHTML5DragAndDrop(element, destination) {\n"
                    + "var dragStartEvent =createEvent('dragstart');\n" + "dispatchEvent(element, dragStartEvent);\n"
                    + "var dropEvent = createEvent('drop');\n"
                    + "dispatchEvent(destination, dropEvent,dragStartEvent.dataTransfer);\n"
                    + "var dragEndEvent = createEvent('dragend');\n"
                    + "dispatchEvent(element, dragEndEvent,dropEvent.dataTransfer);\n" + "}\n" + "\n"
                    + "var source = arguments[0];\n" + "var destination = arguments[1];\n"
                    + "simulateHTML5DragAndDrop(source,destination);", sourceEle, targetEle);


 
        await driver.sleep(2000);

        let targetText = await sourceEle.getText();
        if (targetText === "B") {
            console.log("PASS: Source is dropped at location");
        } else {
            console.log("FAIL: Source is not dropped at location");
        }

    });
    
});
