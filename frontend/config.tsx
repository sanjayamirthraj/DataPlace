import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
//changes to the config to test gitignore
//this is another test
const accountNumber = "60d6252fC31177B48732ab89f073407788F09C61";
export const account = `0x${accountNumber}`;

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
