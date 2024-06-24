import { Scraper } from './scraper';

Scraper.lookupChrono24('SNXS77K1', false, 3).then(a => console.log(a));
Scraper.lookupEbay(186451664803).then(a => console.log(a));

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