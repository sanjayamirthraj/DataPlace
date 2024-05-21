import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
//these are changes to config to check the gitignore
const privateKey: Address = `0x2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105`;
export const account: Account = privateKeyToAccount(privateKey);

const config: StoryConfig = {
  transport: http(process.env.RPC_PROVIDER_URL),
  account: account, // the account object from above
  chainId: "sepolia",
};

export const client = StoryClient.newClient(config);

export const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://rpc.ankr.com/eth_sepolia"),
});
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://rpc.ankr.com/eth_sepolia"),
});
