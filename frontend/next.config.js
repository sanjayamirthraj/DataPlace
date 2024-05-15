/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;


import { custom } from 'viem';
import { Address } from 'viem/accounts';
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

if (window.ethereum) {
  const [account]: [Address] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  
  const config: StoryConfig = {
    transport: custom(window.ethereum),
    account: account, // the account address from above
    chainId: 'sepolia'
  };
  export const client = StoryClient.newClient(config);
}
