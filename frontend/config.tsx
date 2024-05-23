import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import 'dotenv/config';
//changes to the config to test gitignore
//this is another test
console.log(process.env.PRIVATE_KEY);
const privateKey: Address = '0xa7c471add4b92a80b1ab49f2615262d2bfdc25f8e4f46940a70f4927e3f6912d';
const account: Account = privateKeyToAccount(privateKey);

const config: StoryConfig = {
  transport: http(process.env.RPC_PROVIDER_URL),
  account: account, // the account object from above
  chainId: "sepolia",
};
  
export const client = StoryClient.newClient(config);

export const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(process.env.RPC_PROVIDER_URL),
});
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.RPC_PROVIDER_URL),
});
