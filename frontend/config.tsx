import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient, Hex } from "viem";
import { sepolia } from "viem/chains";
import 'dotenv/config';
//changes to the config to test gitignore
//this is another test
console.log(process.env.PRIVATE_KEY);

const privateKey: Address = `0x${process.env.PRIVATE_KEY}`;
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
