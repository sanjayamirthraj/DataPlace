import React, { useState, useEffect } from "react";
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
  DialogFooter,
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
  {
    id: 1,
    name: "Frankenstein",
    description: "Frankenstein Novels and Content",
    image:
      "https://cdn.simplehash.com/assets/be287195aa1a1f70c49f3209dd1ee53d0c60fd301b3f7672be3bce74d68bd723.jpg?date=1718083800000",
    IPid: "0x34978B1bF53bE8EEcF7be9F7A579CBd72b8bdaBD",
  },
  {
    id: 2,
    name: "Blockchain Tweets",
    description: "Tweets with the hastag #Blockchain",
    image:
      "https://cdn.simplehash.com/assets/4796ac4f57128b0a5743cb470dc47383460d0c55c28dae46d277a4df32106d1d.png?date=1718083800000",
    IPid: "0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2",
  },
  {
    id: 3,
    name: "34K GeeksforGeeks Articles",
    description:
      "Articles published on GeeksforGeeks (computer science resource platform)",
    image:
      "https://cdn.simplehash.com/assets/823c2d42973c480b9e515949d7e7cb72fb6a8018895a57b6ca737948f925dbd7.png?date=1718102700000",
    IPid: "0xC5da898A67C07A95B17E99bf8C117B09DE1dd495",
  },
  {
    id: 4,
    name: "A Decade of Corona Challenges",
    description:
      "Ten years worth of data about the COVID-19 pandemic. It covers things like how many people got sick, how many passed away, and how many got vaccinated.",
    image:
      "https://cdn.simplehash.com/assets/7292f27e8e6bc4e017ee2251362c0c828475cf329812d3ba01fbec5b829fc46c.png?date=1718109900000",
    IPid: "0x75cc66F5b030fDb800EAbDbDbFC1ceBE46aE9BF8",
  },
  {
    id: 5,
    name: "2024 Population Projection",
    description:
      "2024 population count by country and land area size of the country.",
    image:
      "https://cdn.simplehash.com/assets/2f3d4b30d2b97cb1d506d3491ffbaf192f6bb5723aa1e6b05aff123abad771dc.jpg?date=1718112600000",
    IPid: "0x9b1b7aF5B9c69D381f552237998649DE71C47096",
  },
  {
    id: 6,
    name: "Faceless Photos",
    description:
      "An essay written about how the rise of faceless photos came about.",
    image:
      "https://cdn.simplehash.com/assets/1ba7a4e111198c89b49db86d5183fbbaefaed9f4a6a59940a843f5daa3109238.jpg?date=1718116200000",
    IPid: "0xB1131a211A5E03FFa57293D7DF14a40Bb027F5fb",
  },
  {
    id: 7,
    name: "What do you know about Koalas?",
    description: "Learn more about koalas here.",
    image:
      "https://cdn.simplehash.com/assets/f427c53f7d0ab0c95feb08af74c01229a56dfc31fbef93ffc989e2d57ae668e3.avif?date=1718115300000",
    IPid: "0xf649016507f186c4e79596be836Cab840c87F3E4",
  },
  {
    id: 8,
    name: "Canyons and more",
    description: "Explore some of the coolest places that Earth can offer!",
    image:
      "https://cdn.simplehash.com/assets/a750e929fb9f56f318a44474672897e2b07c78819701ec9b4e4393b21a86ada8.jpg?date=1718115300000",
    IPid: "0x06C820dA7Bb99c629A845cBb800347b1BBBE3711",
  },
  {
    id: 9,
    name: "Modern Architecture",
    description:
      "Explore the changing landscape of architecture in the 21st century.",
    image:
      "https://cdn.simplehash.com/assets/521e462f599ca7033c95d5d96877c10344a94eda5e32a0b260ca6d3c78f5b606.jpg?date=1718115300000",
    IPid: "0xCa98AEbDe42e2C76575D69DCc912b69F4C5da28d",
  },
  {
    id: 10,
    name: "Health and Fitness Tips",
    description:
      "Tips and advice for maintaining a healthy lifestyle and improving fitness.",
    image:
      "https://cdn.simplehash.com/assets/c8aa1fdcc1ea3931ad00ce053cbbea8ecc8197c01bf461258ea09dbffd205eb5.jpg?date=1718115300000",
    IPid: "0xEA3F5702744259a65745F881BFb7A17027511557",
  },
  {
    id: 11,
    name: "Recipe Collection",
    description:
      "A collection of recipes from various cuisines and cooking styles.",
    image:
      "https://cdn.simplehash.com/assets/8cd35c2ff51b7e5241a24e28fd01b3d3efa84b2d5a08caf49159a3347c2b1bda.jpg?date=1718115300000",
    IPid: "0x86c08b78c56f3d0115174c51B0eB0E7f091f5286",
  },
  {
    id: 12,
    name: "Nature Photography Collection",
    description:
      "A collection of stunning nature photographs taken by professional photographers.",
    image:
      "https://cdn.simplehash.com/assets/53ff3e66186372c58f951adb8d0a1bdd1bb5dd2d410ecebe1674fc9dc4c1048f.jpg?date=1718115300000",
    IPid: "0x9e94d3bD3534553bA0130aa7faa5c3C60975712f",
  },
  {
    id: 13,
    name: "Music Production Samples",
    description:
      "A collection of high-quality music production samples and loops.",
    image:
      "https://cdn.simplehash.com/assets/69ac28cb44bcf041b5d103706c80cad6b6207ced313c7d768f7875d448ea07e5.jpg?date=1718115300000",
    IPid: "0xd5F3EA90c48C277c67b69B12e5d0D66bf74C095a",
  },
  {
    id: 14,
    name: "Virtual Reality Games",
    description: "A collection of virtual reality games and experiences.",
    image:
      "https://cdn.simplehash.com/assets/496c5f7c6527d93be09a1673fad445942f7c73b8a80cef37a04cc149f84766c4.jpg?date=1718116200000",
    IPid: "0x6a3e7e1d0a0e2e6b4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e",
  },
  {
    id: 15,
    name: "Artificial Intelligence Algorithms",
    description:
      "A collection of artificial intelligence algorithms and models.",
    image:
      "https://cdn.simplehash.com/assets/92990e4016d2755b978fd69e2b2e939a4382555b30718fa2d73da3d090e50f00.jpg?date=1718116200000",
    IPid: "0x6a3e7e1d0a0e2e6b4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e4e8e",
  },
].map((item) => ({
  ...item,
  price: parseFloat(
    (0.099 * seededRandom(item.id * 1000)() + 0.001).toFixed(3)
  ),
}));

const Market: NextPage = () => {
  const account = useAccount();
  const [sortedItems, setSortedItems] = useState<Item[]>(items);

  const sortItems = (type: string) => {
    if (type === "price") {
      setSortedItems(
        [...sortedItems].sort(
          (a, b) =>
            parseFloat(a.price.toString()) - parseFloat(b.price.toString())
        )
      );
    } else if (type === "name") {
      setSortedItems(
        [...sortedItems].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => sortItems("price")}
          >
            Sort by Price
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => sortItems("name")}
          >
            Sort by Name
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sortedItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Want to use this IP to train your model? Mint a License
                        Token!
                      </DialogTitle>
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
                          style={{ textDecoration: "none" }}
                        >
                          Mint License Token
                        </Link>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <p className="text-lg font-bold mt-2">
                  {item.price.toFixed(3)} ETH
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
