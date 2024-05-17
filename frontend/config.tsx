import { http } from "viem";
import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

const privateKey: Address = `0x2fa8efe237294d598f4c2699f69a0a9228c5263805a408dffabbea6dcf6e4105`;
const account: Account = privateKeyToAccount(privateKey);

const config: StoryConfig = {
  transport: http(process.env.RPC_PROVIDER_URL),
  account: account, // the account object from above
  chainId: "sepolia",
};

export const client = StoryClient.newClient(config);
