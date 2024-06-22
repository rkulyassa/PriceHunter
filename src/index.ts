import express from 'express';
import path from 'path';
import * as Protocol from './models/Protocol.model';
import { lookupEbay } from './scraper';

const PORT: number = 3000;

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    try {
        res.send('index.html');
    } catch (error) {
        next(error);
    }
});

app.get('/api/marketplace', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let target: Protocol.SupportedMarketplace, id: number;
    if (Protocol.SupportedMarketplaces.includes(req.query.target as string) && Number.parseInt(req.query.id as string)) {
        target = req.query.target as Protocol.SupportedMarketplace;
        id = Number.parseInt(req.query.id as string);
    } else {
        res.status(400).send(`Bad request params`);
        return;
    }

    if (target === 'ebay') {
        const watchData = await lookupEbay(id);
        res.send(watchData);
        // try {
        //     res.send('ebay');
        // } catch (error) {
        //     next(error);
        // }
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
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