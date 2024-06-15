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
    scopeOfDeliveryDropdown: '#scopeOfDelivery',
    calculateStatsButton: '#calculateStats',
    valueRangeSpans: '#main-content > section.market-value.text-center.p-t-5 > div > div > div > div.value-range.justify-content-between.m-b-5.p-b-5.d-none.d-sm-flex > div > span'
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

    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.firstProductSearchResult)))
    const firstProductSearchResult: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.firstProductSearchResult));
    await firstProductSearchResult.click();

    const conditionSelectionIndex: number = watchData.condition === WatchCondition.PRE_OWNED ? 2 : 1
    await driver.executeScript(`document.querySelector('${SELECTORS.conditionDropdown}').selectedIndex = ${conditionSelectionIndex}`);

    let scopeOfDeliverySelectionIndex: number = 1;
    if (watchData.withOriginalPackaging && watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 4;
    } else if (watchData.withOriginalPackaging) {
        scopeOfDeliverySelectionIndex = 2;
    } else if (watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 3;
    }
    await driver.executeScript(`document.querySelector('${SELECTORS.scopeOfDeliveryDropdown}').selectedIndex = ${scopeOfDeliverySelectionIndex}`);

    const calculateStatsButton: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.calculateStatsButton));
    await calculateStatsButton.click();

    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.allowCookiesDialog)));
    await driver.executeScript(`document.querySelector('${SELECTORS.allowCookiesDialog}').remove()`);

    const valueRangeSpans: Array<Selenium.WebElement> = await driver.findElements(Selenium.By.css(SELECTORS.valueRangeSpans));
    const values: number[] = await Promise.all(
        valueRangeSpans.map(async span => Number.parseInt((await span.getText()).slice(1)))
    );
    if (values.length !== 3) throw new Error("Expected exactly 3 values for WatchValuation");

    await driver.quit();

    return values as WatchValuation;
    
}

const sampleData: WatchData = {
    condition: WatchCondition.NEW_WITH_TAGS,
    price: 108.89,
    reference: 'SNXS77K1',
    withOriginalPackaging: true,
    withPapers: true
}
// should give 142,146,150

lookupChrono24(sampleData).then((valuation: WatchValuation) => console.log(valuation)).catch(console.error);