import * as Selenium from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { DriverService } from 'selenium-webdriver/remote';

const CHRONO24_URL = 'https://www.chrono24.com/info/valuation.htm';

const enum WatchCondition {
    NEW_WITH_TAGS,
    NEW_WITHOUT_TAGS,
    NEW_WITH_DEFECTS,
    PRE_OWNED
}

interface WatchData {
    condition: WatchCondition;
    price: number;
    reference: string;
    withOriginalPackaging: boolean;
    withPapers: boolean;
}

type WatchValuation = [min: number, average: number, max: number];

const SELECTORS = {
    allowCookiesInput: 'body > dialog > div > div.gdpr-layer-footer.m-t-3 > button',
    productSearchField: '#productSearch',
    firstProductSearchResult: '#valuationForm > div.valuation-inputs.row.row-compressed.m-x-auto > div:nth-child(1) > div.form-group.form-group-lg.m-b-0 > div > ul > li:nth-child(1)',
    conditionDropdown: '#condition',
    scopeOfDeliveryDropdown: '#scopeOfDelivery'
}

async function lookupChrono24(watchData: WatchData): Promise<WatchValuation> {
    const options: chrome.Options = new chrome.Options();
    const service: DriverService = new chrome.ServiceBuilder('/Users/ryan/Desktop/Arbitrage App/server/src/chromedriver-mac-arm64/chromedriver').build();
    const driver: chrome.Driver = await chrome.Driver.createSession(options, service);

    // Magic here ✨
    await driver.get(CHRONO24_URL);
    const allowCookiesInput = await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.allowCookiesInput)));
    console.log(await allowCookiesInput.getAttribute('outerHTML'));

    for (let i = 0; i < 100; i++) {
        await driver.sleep(1000);
        try {
            allowCookiesInput.click();
            console.log("Clicked");
        } catch (e) {
            console.error(e);
        }
    }

    await allowCookiesInput.click();

    // await driver.sleep(3).then(() => allowCookiesInput.click());
    // await allowCookiesInput.click();
    // await driver.executeScript('arguments[0].scrollIntoView(true);', element);
    // await driver.sleep(5).then(() => allowCookiesInput.click());
    // await driver.executeScript('arguments[0].click()', allowCookiesInput);
    // const productSearchField: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.productSearchField));
    // await productSearchField.sendKeys(watchData.reference);
    // const firstProductSearchResult: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.firstProductSearchResult));
    // await firstProductSearchResult.click();
    // const conditionDropdown: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.conditionDropdown));
    // const scopeOfDeliveryDropdown: Selenium.WebElement = await driver.findElement(Selenium.By.id(SELECTORS.scopeOfDeliveryDropdown));
    // await conditionDropdown.click();
    // console.log(await conditionDropdown.getText());
    // await conditionDropdown.sendKeys('Unworn');
    // const ss = await conditionDropdown.takeScreenshot();
    // console.log(ss);
    // await conditionDropdown.click();
    // await driver.quit();
    return [0,1,2];
}

const sampleData: WatchData = {
    condition: WatchCondition.NEW_WITH_TAGS,
    price: 108.89,
    reference: 'SNXS77K1',
    withOriginalPackaging: true,
    withPapers: true
}

lookupChrono24(sampleData).then((valuation: WatchValuation) => console.log(valuation)).catch(console.error);