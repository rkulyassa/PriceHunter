import * as Protocol from '../../src/models/Protocol.model';
import * as Watch from '../../src/models/Watch.model';
import * as Valuation from '../../src/models/Valuation.model';

export class APIService {
    private static baseUrl: string = 'http://localhost:3000';

    static async query(endpoint: string): Promise<any> {
        const data: Response = await fetch(`${APIService.baseUrl}/api/${endpoint}`);
        return data.ok ? data.json() : false;
    }

    // static async getListing(marketplace: Protocol.SupportedMarketplace, id: string): Promise<Watch.Data> {
    //     return APIService.query(`marketplace?target=${marketplace}&id=${id}`);
    // }

    // static async getValuation(target: Protocol.SupportedValuator, reference: string, preOwned: boolean, deliveryScope: Watch.DeliveryScope): Promise<Valuation.Range> {
    //     return APIService.query(`valuation?target=${target}&reference=${reference}&preOwned=${preOwned}&deliveryScope=${deliveryScope}`);
    // }
}