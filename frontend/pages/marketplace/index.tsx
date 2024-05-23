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
} from "../../components/ui/dialog"

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    IPid: string;
  }


  
  const items: Item[] = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    description: `This is a description for item ${index + 1}.`,
    price: (index + 1) * 10,
    image: `https://via.placeholder.com/150?text=Item+${index + 1}`,
    IPid: "0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2",
  }));
  
const Market: NextPage = () => {
  const account = useAccount();

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
              <div className="mt-4">
              <Dialog>
                <DialogTrigger>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Want to buy this IP?</DialogTitle>
                      <DialogDescription>
                        {`${item.name}`}
                        <br></br>
                        {`IP id: ${item.IPid}`}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog> 
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-bold mt-2">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
