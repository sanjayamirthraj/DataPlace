import React, { useState, useEffect } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../../components/ui/dialog";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  IPid: string;
}
function seededRandom(seed: number) {
  // A simple linear congruential generator (LCG)
  return function () {
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // 2^32
    seed = (a * seed + c) % m;
    return seed / m;
  };
}

const items: Item[] = [
  { id: 1, name: 'Frankenstein', description: 'Frankenstein Novels and Content', image: 'https://cdn.simplehash.com/assets/be287195aa1a1f70c49f3209dd1ee53d0c60fd301b3f7672be3bce74d68bd723.jpg?date=1718083800000', IPid: '0x34978B1bF53bE8EEcF7be9F7A579CBd72b8bdaBD' },
  { id: 2, name: 'Blockchain Tweets', description: 'Tweets with the hastag #Blockchain', image: 'https://cdn.simplehash.com/assets/4796ac4f57128b0a5743cb470dc47383460d0c55c28dae46d277a4df32106d1d.png?date=1718083800000', IPid: '0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2' },
  { id: 3, name: '34K GeeksforGeeks Articles', description: 'Articles published on GeeksforGeeks (computer science resource platform)', image: 'https://cdn.simplehash.com/assets/823c2d42973c480b9e515949d7e7cb72fb6a8018895a57b6ca737948f925dbd7.png?date=1718102700000', IPid: '0xC5da898A67C07A95B17E99bf8C117B09DE1dd495' },
  { id: 4, name: 'A Decade of Corona Challenges', description: 'Ten years worth of data about the COVID-19 pandemic. It covers things like how many people got sick, how many passed away, and how many got vaccinated.', image: 'https://cdn.simplehash.com/assets/7292f27e8e6bc4e017ee2251362c0c828475cf329812d3ba01fbec5b829fc46c.png?date=1718109900000', IPid: '0x75cc66F5b030fDb800EAbDbDbFC1ceBE46aE9BF8' },
  { id: 5, name: '2024 Population Projection', description: '2024 population count by country and land area size of the country.', image: 'https://cdn.simplehash.com/assets/2f3d4b30d2b97cb1d506d3491ffbaf192f6bb5723aa1e6b05aff123abad771dc.jpg?date=1718112600000', IPid: '0x9b1b7aF5B9c69D381f552237998649DE71C47096' },

  // Add additional items
].map(item => ({
  ...item,
  price: parseFloat((0.099 * seededRandom(item.id * 1000)() + 0.001).toFixed(3))
}));

const Market: NextPage = () => {
  const account = useAccount();
  const [sortedItems, setSortedItems] = useState<Item[]>(items);

  const sortItems = (type: string) => {
    if (type === 'price') {
      setSortedItems([...sortedItems].sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString())));
    } else if (type === 'name') {
      setSortedItems([...sortedItems].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => sortItems('price')}>Sort by Price</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => sortItems('name')}>Sort by Name</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sortedItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Want to use this IP to train your model? Mint a License Token!</DialogTitle>
                      <DialogDescription>
                        {`${item.name}`}
                        <br></br>
                        {`IP id: ${item.IPid}`}
                        <br></br>
                        {`Item Description: ${item.description}`}
                        <br></br>
                        <br></br>
                        <Link
                          href="../"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          style={{ textDecoration: 'none' }}
                        >
                          Mint License Token
                        </Link>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <p className="text-lg font-bold mt-2">{item.price.toFixed(3)} ETH</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
