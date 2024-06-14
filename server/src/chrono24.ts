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
    // allowCookiesInput: 'body > dialog > div > div.gdpr-layer-footer.m-t-3 > button',
    allowCookiesDialog: 'body > dialog',
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
    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.allowCookiesDialog)));
    await driver.executeScript(`document.querySelector('${SELECTORS.allowCookiesDialog}').remove()`);

    const productSearchField: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.productSearchField));
    await productSearchField.sendKeys(watchData.reference);

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