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



describe("REGR_File Downloader", async function(){//known issue present, BUG appears occasionally - Bad Request
    
    var driver;

    //page content occasionally changes. TC is generic
    it("TC-33, verify that Download links are clickable, the file is downloaded when the user clicks on download, the downloaded file name is the same as the one shown before download ", async function(){

        const firefox = require('selenium-webdriver/firefox');
        const { Builder } = require("selenium-webdriver");
    

        const options = new firefox.Options();
        let profile = './selenium_profile';//using specific profile to avoid pdf viewer
        options.setProfile(profile);
        driver = new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();

        
        const checkExistsWithTimeout = require('./waitForFileExists.js');

        const path = require('path')
        const fs = require('fs')
        const { URL } = require('url')
   
        await driver.get('https://the-internet.herokuapp.com/download');

        var downloadLink = await driver.findElements(By.xpath("//*[@id='content']/div/a"));

        //verify all download links and file names
        for(let i = 0; i < downloadLink.length; i++){
            downloadLink[i].click();

            var downloadHref = await downloadLink[i].getAttribute("href");

            downloadHref = downloadHref.replaceAll('%20', ' ');//workaround for %20 in name

            var fileName_text = await downloadLink[i].getText();

            var downloadUrl = new URL(downloadHref);

            console.log("Last processed file: url: ", downloadHref);

            var fullPath = downloadUrl.pathname;

            var splitPath = fullPath.split("/");

            var fileName = splitPath.splice(-1)[0];

            fileName = fileName.replaceAll('%20', ' ');//workaround for %20 in name

            var filePath = path.join("C:/Users/" + user_name + "/Downloads", fileName_text );

            await checkExistsWithTimeout(filePath, 60000);

        };

        await driver.quit();
    });
       
});

