import * as Protocol from '../../src/models/Protocol.model';
import * as Watch from '../../src/models/Watch.model';

export class ApiService {

    private static url = 'http://localhost:3000';

    static async query(endpoint: string): Promise<any> {
        const data = await fetch(`${ApiService.url}/api/${endpoint}`);
        return data.json();
    }

    static async getListing(marketplace: Protocol.SupportedMarketplace, id: string): Promise<Watch.Data> {
        return ApiService.query(`marketplace?target=${marketplace}&id=${id}`);
    }
}