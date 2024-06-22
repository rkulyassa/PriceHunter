import * as Selenium from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { DriverService } from 'selenium-webdriver/remote';
import { JSDOM } from 'jsdom';
import { WatchData, WatchCondition, WatchValuation } from './models/Watch.model';

const CHRONO24_URL = 'https://www.chrono24.com/info/valuation.htm';
const DRIVER_PATH = __dirname + '/drivers/chromedriver';

const SELECTORS = {
    chrono24: {
        allowCookiesDialog: '/html/body/dialog',
        productSearchField: '//*[@id="productSearch"]',
        firstProductSearchResult: '//*[@id="valuationForm"]/div[1]/div[1]/div[1]/div/ul/li[1]',
        conditionDropdown: '//*[@id="condition"]',
        scopeOfDeliveryDropdown: '//*[@id="scopeOfDelivery"]',
        calculateStatsButton: '//*[@id="calculateStats"]',
        valueRangeContainer: '//*[@id="main-content"]/section[1]/div/div/div/div[3]'
    },
    ebay: {
        condition: '//*[@class="x-item-condition-text"]/div/span/span[1]',
        conditionDetailed: '//*[text()[contains(.,"Condition")]]/ancestor::dl/dd',
        price: '//*[@class="x-price-primary"]',
        reference: '//*[text()[contains(.,"Reference Number")]]/ancestor::dl/dd',
        withOriginalPackaging: '//*[text()[contains(.,"With Original Box/Packaging")]]/ancestor::dl/dd',
        withPapers: '//*[text()[contains(.,"With Papers")]]/ancestor::dl/dd'
    }
}

export async function lookupChrono24(watchData: WatchData): Promise<WatchValuation> {
    const options: chrome.Options = new chrome.Options();
    options.addArguments('--headless');
    const service: DriverService = new chrome.ServiceBuilder(DRIVER_PATH).build();
    const driver: chrome.Driver = await chrome.Driver.createSession(options, service);

    await driver.get(CHRONO24_URL);
    await driver.wait(Selenium.until.elementLocated(Selenium.By.xpath(SELECTORS.chrono24.allowCookiesDialog)));
    await driver.executeScript(`document.evaluate('${SELECTORS.chrono24.allowCookiesDialog}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.remove();`)

    const productSearchField: Selenium.WebElement = await driver.findElement(Selenium.By.xpath(SELECTORS.chrono24.productSearchField));
    await productSearchField.sendKeys(watchData.reference);

    await driver.wait(Selenium.until.elementLocated(Selenium.By.xpath(SELECTORS.chrono24.firstProductSearchResult)))
    const firstProductSearchResult: Selenium.WebElement = await driver.findElement(Selenium.By.xpath(SELECTORS.chrono24.firstProductSearchResult));
    await firstProductSearchResult.click();

    const conditionSelectionIndex: number = watchData.condition === WatchCondition.PRE_OWNED ? 2 : 1;
    await driver.executeScript(`document.evaluate('${SELECTORS.chrono24.conditionDropdown}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.selectedIndex = ${conditionSelectionIndex};`);

    let scopeOfDeliverySelectionIndex: number = 1;
    if (watchData.withOriginalPackaging && watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 4;
    } else if (watchData.withOriginalPackaging) {
        scopeOfDeliverySelectionIndex = 2;
    } else if (watchData.withPapers) {
        scopeOfDeliverySelectionIndex = 3;
    }
    await driver.executeScript(`document.evaluate('${SELECTORS.chrono24.scopeOfDeliveryDropdown}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.selectedIndex = ${scopeOfDeliverySelectionIndex}`);

    const calculateStatsButton: Selenium.WebElement = await driver.findElement(Selenium.By.xpath(SELECTORS.chrono24.calculateStatsButton));
    await calculateStatsButton.click();

    await driver.wait(Selenium.until.elementLocated(Selenium.By.xpath(SELECTORS.chrono24.allowCookiesDialog)));
    await driver.executeScript(`document.evaluate('${SELECTORS.chrono24.allowCookiesDialog}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.remove();`);

    const valueRangeContainer: Selenium.WebElement = await driver.findElement(Selenium.By.xpath(SELECTORS.chrono24.valueRangeContainer));
    const values = (await valueRangeContainer.getText()).split('\n')
        .filter(item => item.startsWith('$'))
        .map(item => parseInt(item.slice(1)));

    await driver.quit();

    return values as WatchValuation;
}

export async function lookupEbay(itemId: number): Promise<WatchData> {
    const response = await fetch(`https://www.ebay.com/itm/${itemId}`);
    const dom: JSDOM = new JSDOM(await response.text());
    const document: Document = dom.window.document;

    const conditionElement: Node | null = document.evaluate(SELECTORS.ebay.condition, document, null, dom.window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let condition: WatchCondition;
    if (conditionElement) {
        switch (conditionElement.textContent) {
            case 'New with tags':
                condition = WatchCondition.NEW_WITH_TAGS;
                break;
            case 'New without tags':
                condition = WatchCondition.NEW_WITHOUT_TAGS;
                break;
            default:
                throw new Error('Ebay WatchCondition not recognized');
        }
    } else {
        throw new Error('Could not parse ebay condition element');
    }

    const priceElement: Node | null = document.evaluate(SELECTORS.ebay.price, document, null, 9, null).singleNodeValue;
    let price: number;
    if (priceElement && priceElement.textContent) {
        price = Number.parseFloat(priceElement.textContent.slice(4));
    } else {
        throw new Error('Could not parse ebay price element');
    }

    const referenceElement: Node | null = document.evaluate(SELECTORS.ebay.reference, document, null, 9, null).singleNodeValue;
    let reference: string;
    if (referenceElement && referenceElement.textContent) {
        reference = referenceElement.textContent;
    } else {
        throw new Error('Could not parse ebay reference element');
    }
    
    const withOriginalPackagingElement: Node | null = document.evaluate(SELECTORS.ebay.withOriginalPackaging, document, null, 9, null).singleNodeValue;
    let withOriginalPackaging: boolean;
    if (withOriginalPackagingElement && withOriginalPackagingElement.textContent) {
        withOriginalPackaging = withOriginalPackagingElement.textContent === 'Yes';
    } else {
        throw new Error('Could not parse ebay withOriginalPacking element');
    }

    const withPapersElement: Node | null = document.evaluate(SELECTORS.ebay.withPapers, document, null, 9, null).singleNodeValue;
    let withPapers: boolean;
    if (withPapersElement && withPapersElement.textContent) {
        withPapers = withPapersElement.textContent === 'Yes';
    } else {
        throw new Error('Could not parse ebay withPapers element');
    }

    return {
        condition: condition,
        price: price,
        reference: reference,
        withOriginalPackaging: withOriginalPackaging,
        withPapers: withPapers
    }
}