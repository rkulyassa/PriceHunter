import * as Protocol from '../../src/models/Protocol.model';
import * as Watch from '../../src/models/Watch.model';

export class ApiService {
    private static baseUrl: string = 'http://localhost:3000';

    static async query(endpoint: string): Promise<any> {
        const data: Response = await fetch(`${ApiService.baseUrl}/api/${endpoint}`);
        return data.ok ? data.json() : false;
    }

    static async getListing(marketplace: Protocol.SupportedMarketplace, id: string): Promise<Watch.Data> {
        return ApiService.query(`marketplace?target=${marketplace}&id=${id}`);
    }
}