import { Scraper } from '../src/services/scraper';

(async () => {
    const data = await Scraper.lookupChrono24('SNXS77K1', false, 3);
    console.log(data);
})();