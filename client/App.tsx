import React from 'react';
import Input from './components/Input';
import Header from './components/Header';
import { APIService } from './services/APIService';
import * as Protocol from '../src/models/Protocol.model';
import * as Watch from '../src/models/Watch.model';
import * as Valuation from '../src/models/Valuation.model';
import * as Callbacks from './models/Callbacks.model';

const App: React.FC = () => {
  const [listings, setListings] = React.useState<Array<Watch.Data>>([]);
  const [valuations, setValuations] = React.useState<Array<Valuation.Range>>([]);

  const processInput: Callbacks.OnEnter = async (id: string): Promise<void> => {
    const marketplace: Protocol.SupportedMarketplace = 'ebay';
    console.log('Fetching eBay data...');
    const listing: Watch.Data = await APIService.query(`marketplace?target=${marketplace}&id=${id}`);
    console.log(listing);
    if (listing) setListings([...listings, listing]);

    const valuator: Protocol.SupportedValuator = 'chrono24';
    const reference = listing.reference;
    const preOwned = listing.condition === Watch.Condition.PRE_OWNED;
    let deliveryScope;
    if (listing.withOriginalPackaging && listing.withPapers) {
      deliveryScope = Watch.DeliveryScope.WATCH_WITH_ORIGINAL_BOX_AND_PAPERS;
    } else if (listing.withOriginalPackaging) {
      deliveryScope = Watch.DeliveryScope.WATCH_WITH_ORIGINAL_BOX;
    } else if (listing.withPapers) {
      deliveryScope = Watch.DeliveryScope.WATCH_WITH_ORIGINAL_PAPERS;
    } else {
      deliveryScope = Watch.DeliveryScope.WATCH_ONLY;
    }
    console.log('Fetching Chrono24 valuation...');
    const valuation: Valuation.Range = await APIService.query(`valuation?target=${valuator}&reference=${reference}&preOwned=${preOwned}&deliveryScope=${deliveryScope}`);
    console.log(valuation);
    if (valuation) setValuations([...valuations, valuation]);
  }

  return (
    <>
      <Header />
      <Input onEnter={processInput} />
      <ul>{listings.map(listing => (
        <li key={listings.indexOf(listing)}>{listing.reference}<br />Range: ${valuations[listings.indexOf(listing)]}</li>
      ))}</ul>
    </>
  );
}

export default App;