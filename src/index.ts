import express from 'express';
import path from 'path';
import { z } from 'zod';
import { Scraper} from './scraper';
import * as Protocol from './models/Protocol.model';
import * as Watch from './models/Watch.model';

const PORT: number = 3000;

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.send('index.html');
});

app.get('/api/valuation', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let target: Protocol.SupportedValuator = req.query.target as Protocol.SupportedValuator;
    let reference: string = req.query.reference as string;
    let preOwned: boolean = req.query.preOwned === 'true';
    let deliveryScope: Watch.DeliveryScope = Number.parseInt(req.query.deliveryScope as string);
    if (target === 'chrono24') {
        const valuation: Watch.Valuation = await Scraper.lookupChrono24(reference, preOwned, deliveryScope);
        res.send(valuation);
    }

    // const validation = z.object({
    //     target: z.string(),
    //     reference: z.string(),
    //     preOwned: z.boolean(),
    //     deliveryScope: z.number().min(0).max(3)
    // }).safeParse(req.body);
    // if (!validation.success ||
    // !Protocol.SupportedValuators.includes(req.query.target as string) ||
    // Number.parseInt(req.query.deliveryScope as string) < 0 ||
    // Number.parseInt(req.query.deliveryScope as string) > 3) {
    //     res.status(400).send('Bad query');
    //     return;
    // }
    // const target: Protocol.SupportedValuator = req.query.target as Protocol.SupportedValuator;
    // const reference: string = req.query.reference as string;
    // const preOwned: boolean = (req.query.preOwned as unknown) as boolean;
    // const deliveryScope: Watch.DeliveryScope = (req.query.deliveryScope as unknown) as Watch.DeliveryScope;

    // console.log(req.body);
    // const watchData: Watch.Data = req.body;
    // console.log(watchData);
    // if (req.query.target === 'chrono24') {
    //     const valuation = await Scraper.lookupChrono24(watchData);
    //     res.send(valuation);
    // }
});

app.get('/api/marketplace', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    let target: Protocol.SupportedMarketplace;
    let id: number;
    if (Protocol.SupportedMarketplaces.includes(req.query.target as string) && Number.parseInt(req.query.id as string)) {
        target = req.query.target as Protocol.SupportedMarketplace;
        id = Number.parseInt(req.query.id as string);
    } else {
        res.status(400).send();
        return;
    }

    if (target === 'ebay') {
        const watchData = await Scraper.lookupEbay(id);
        res.send(watchData);
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});