import React from 'react';
import Input from './components/Input';
import { ApiService } from './services/ApiService';
import * as Protocol from './../src/models/Protocol.model';
import * as Watch from './../src/models/Watch.model';
import * as Callbacks from './models/callbacks.model';

const App: React.FC = () => {
  const [listings, setListings] = React.useState<Array<Watch.Data>>([]);

  const getListing: Callbacks.OnEnter = async (id: string): Promise<void> => {
    const marketplace: Protocol.SupportedMarketplace = 'ebay';
    const listing: Watch.Data = await ApiService.getListing(marketplace, id);
    if (listing) setListings([...listings, listing]);
  }
  return (
    <>
      <h1>PriceHunter</h1>
      <h3>v0.1.2</h3>
      <Input onEnter={getListing} />
      <ul>{listings.map(listing => (
        <li key={listings.indexOf(listing)}>{listing.reference}</li>
      ))}</ul>
    </>
  );
}

export default App;