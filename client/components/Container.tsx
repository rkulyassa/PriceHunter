import React from 'react';
import { ApiService } from '../services/ApiService';
import * as Protocol from '../../src/models/Protocol.model';
import * as Watch from '../../src/models/Watch.model';

const listings: Array<Watch.Data> = [];

const ListingInput: React.FC = () => {
  const [input, setInput] = React.useState('');

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === 'Enter') {
      const marketplace: Protocol.SupportedMarketplace = 'ebay';
      const id: string = (event.target as HTMLInputElement).value;
      const watchData: Watch.Data = await ApiService.getListing(marketplace, id);
      listings.push(watchData);
    }
  }

  return (
    <input
      type="text"
      placeholder='Enter eBay listing id'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown} />
  );
}

const Listings: React.FC = () => {
  const listItems = listings.map(listing => 
    <li>
      {listing.condition}
      {listing.price}
      {listing.reference}
      {listing.withOriginalPackaging}
      {listing.withPapers}
    </li>
  );
  
  return <ul>{listItems}</ul>
}

const Container: React.FC = () => {
  return (
    <>
      <ListingInput></ListingInput>
      <Listings />
    </>
  );
}

export default Container;