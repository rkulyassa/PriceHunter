import * as Selenium from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { DriverService } from 'selenium-webdriver/remote';
import { JSDOM } from 'jsdom';
import { WatchData, WatchCondition, WatchValuation } from './models/Watch.model';

const CHRONO24_URL = 'https://www.chrono24.com/info/valuation.htm';
const DRIVER_PATH = __dirname + '/drivers/chromedriver';

const SELECTORS = {
    chrono24: {
        allowCookiesDialog: 'body > dialog',
        productSearchField: '#productSearch',
        firstProductSearchResult: '#valuationForm > div.valuation-inputs.row.row-compressed.m-x-auto > div:nth-child(1) > div.form-group.form-group-lg.m-b-0 > div > ul > li:nth-child(1)',
        conditionDropdown: '#condition',
        scopeOfDeliveryDropdown: '#scopeOfDelivery',
        calculateStatsButton: '#calculateStats',
        valueRangeSpans: '#main-content > section.market-value.text-center.p-t-5 > div > div > div > div.value-range.justify-content-between.m-b-5.p-b-5.d-none.d-sm-flex > div > span',
    },
    eBay: {
        condition: '#mainContent > div > div.vim.x-item-condition.mar-t-20 > div.x-item-condition-text > div > span > span:nth-child(1) > span',
        price: '#mainContent > div > div.vim.x-price-section.mar-t-20 > div > div > div.x-price-primary > span',
        reference: '#viTabs_0_is > div > div.ux-layout-section-evo.ux-layout-section--features > div > div:nth-child(12) > div:nth-child(2) > dl > dd > div > div > span',
        withOriginalPackaging: '#viTabs_0_is > div > div.ux-layout-section-evo.ux-layout-section--features > div > div:nth-child(3) > div:nth-child(2) > dl > dd > div > div > span',
        withPapers: '#viTabs_0_is > div > div.ux-layout-section-evo.ux-layout-section--features > div > div:nth-child(3) > div:nth-child(1) > dl > dd > div > div > span'
    }
}

async function lookupChrono24(watchData: WatchData): Promise<WatchValuation> {
    const options: chrome.Options = new chrome.Options();
    const service: DriverService = new chrome.ServiceBuilder(DRIVER_PATH).build();
    const driver: chrome.Driver = await chrome.Driver.createSession(options, service);

    // Magic here ✨
    await driver.get(CHRONO24_URL);
    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.chrono24.allowCookiesDialog)));
    await driver.executeScript(`document.querySelector('${SELECTORS.chrono24.allowCookiesDialog}').remove()`);

    const productSearchField: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.chrono24.productSearchField));
    await productSearchField.sendKeys(watchData.reference);

    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.chrono24.firstProductSearchResult)))
    const firstProductSearchResult: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.chrono24.firstProductSearchResult));
    await firstProductSearchResult.click();

    const conditionSelectionIndex: number = watchData.condition === WatchCondition.PRE_OWNED ? 2 : 1
    await driver.executeScript(`document.querySelector('${SELECTORS.chrono24.conditionDropdown}').selectedIndex = ${conditionSelectionIndex}`);

    let scopeOfDeliverySelectionIndex: number = 1;
    if (watchData.withOriginalPackaging && watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 4;
    } else if (watchData.withOriginalPackaging) {
        scopeOfDeliverySelectionIndex = 2;
    } else if (watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 3;
    }
    await driver.executeScript(`document.querySelector('${SELECTORS.chrono24.scopeOfDeliveryDropdown}').selectedIndex = ${scopeOfDeliverySelectionIndex}`);

    const calculateStatsButton: Selenium.WebElement = await driver.findElement(Selenium.By.css(SELECTORS.chrono24.calculateStatsButton));
    await calculateStatsButton.click();

    await driver.wait(Selenium.until.elementLocated(Selenium.By.css(SELECTORS.chrono24.allowCookiesDialog)));
    await driver.executeScript(`document.querySelector('${SELECTORS.chrono24.allowCookiesDialog}').remove()`);

    const valueRangeSpans: Array<Selenium.WebElement> = await driver.findElements(Selenium.By.css(SELECTORS.chrono24.valueRangeSpans));
    const values: number[] = await Promise.all(
        valueRangeSpans.map(async span => Number.parseInt((await span.getText()).slice(1)))
    );
    if (values.length !== 3) throw new Error('Expected exactly 3 values for WatchValuation');

    await driver.quit();

    return values as WatchValuation;
}

async function lookupeBay(itemId: number): Promise<WatchData> {
    const response = await fetch(`https://www.ebay.com/itm/${itemId}`);
    const dom: JSDOM = new JSDOM(await response.text());
    const document: Document = dom.window.document;

    const conditionElement: Element | null = document.querySelector(SELECTORS.eBay.condition);
    let condition: WatchCondition;
    if (conditionElement) {
        switch (conditionElement.textContent) {
            case 'New with tags':
                condition = WatchCondition.NEW_WITH_TAGS;
                break;
            default:
                throw new Error('eBay WatchCondition not recognized');
        }
    } else {
        throw new Error('Could not parse eBay condition element');
    }

    const priceElement: Element | null = document.querySelector(SELECTORS.eBay.price);
    let price: number;
    if (priceElement && priceElement.textContent) {
        price = Number.parseInt(priceElement.textContent.slice(4));
    } else {
        throw new Error('Could not parse eBay price element');
    }

    const referenceElement: Element | null = document.querySelector(SELECTORS.eBay.reference);
    let reference: string;
    if (referenceElement && referenceElement.textContent) {
        reference = referenceElement.textContent;
    } else {
        throw new Error('Could not parse eBay reference element');
    }
    
    const withOriginalPackingElement: Element | null = document.querySelector(SELECTORS.eBay.withOriginalPackaging);
    let withOriginalPackaging: boolean;
    if (withOriginalPackingElement && withOriginalPackingElement.textContent) {
        withOriginalPackaging = withOriginalPackingElement.textContent === 'Yes';
    } else {
        throw new Error('Could not parse eBay withOriginalPacking element');
    }

    const withPapersElement: Element | null = document.querySelector(SELECTORS.eBay.withPapers);
    let withPapers: boolean;
    if (withPapersElement && withPapersElement.textContent) {
        withPapers = withPapersElement.textContent === 'Yes';
    } else {
        throw new Error('Could not parse eBay withPapers element');
    }

    return {
        condition: condition,
        price: price,
        reference: reference,
        withOriginalPackaging: withOriginalPackaging,
        withPapers: withPapers
    }
}

// const sampleData: WatchData = {
//     condition: WatchCondition.NEW_WITH_TAGS,
//     price: 108.89,
//     reference: 'SNXS77K1',
//     withOriginalPackaging: true,
//     withPapers: true
// }

lookupeBay(186451664803).then((watchData: WatchData) => {
    lookupChrono24(watchData).then((valuation: WatchValuation) => {
        console.log(valuation)
    }).catch(console.error);
}).catch(console.error);