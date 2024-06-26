import { Scraper } from '../src/services/scraper';
import * as Watch from '../src/models/Watch.model';


// Scraper.lookupChrono24('SNXS77K1', false, 3).then(a => console.log(a));
// Scraper.lookupEbay(186451664803).then(a => console.log(a));

test.skip('Ebay tests', async () => {
    expect(await Scraper.lookupEbay(186451664803)).toMatchObject({
        condition: Watch.Condition.NEW_WITH_TAGS,
        price: 112.99,
        reference: 'SNXS77K1',
        withOriginalPackaging: true,
        withPapers: true
    });
    expect(await Scraper.lookupEbay(264908359756)).toMatchObject({
        condition: Watch.Condition.NEW_WITHOUT_TAGS,
        price: 107.25,
        reference: 'SGF524',
        withOriginalPackaging: true,
        withPapers: false
    });
});

test('Chrono24 tests', async () => {
    // https://www.ebay.com/itm/186451664803
    // expect(await Scraper.lookupChrono24('SNXS77K1', false, 3)).toStrictEqual([142, 152, 162]);
    // https://www.ebay.com/itm/264908359756
    // expect(await Scraper.lookupChrono24('SGF524', false, 3)).toStrictEqual([]);
});

// 186451664803 - Seiko SNXS77K1
// 264908359756 - Seiko SGF524

// const sampleData: WatchData = {
//     condition: WatchCondition.NEW_WITH_TAGS,
//     price: 108.89,
//     reference: 'SNXS77K1',
//     withOriginalPackaging: true,
//     withPapers: true
// }

// lookupChrono24(sampleData).then((valuation: WatchValuation) => {
//     console.log(valuation)
// }).catch(console.error);

// lookupeBay(186451664803).then((watchData: WatchData) => {
//     console.log(watchData);
//     lookupChrono24(watchData).then((valuation: WatchValuation) => {
//         console.log(valuation)
//     }).catch(console.error);
// }).catch(console.error);