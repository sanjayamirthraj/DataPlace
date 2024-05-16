import { http } from "viem";
import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";

const privateKey: Address = `0x${process.env.WALLET_PRIVATE_KEY}`;
const account: Account = privateKeyToAccount(privateKey);

const config: StoryConfig = {
  transport: http(process.env.RPC_PROVIDER_URL),
  account: account, // the account object from above
  chainId: "sepolia",
};

export const client = StoryClient.newClient(config);