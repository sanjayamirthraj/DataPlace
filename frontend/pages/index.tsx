import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { account, client } from "../config";
import { Account, privateKeyToAccount, Address } from "viem/accounts";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { http, createWalletClient, createPublicClient } from "viem";
import { sepolia } from "viem/chains";
import Link from "next/link";

//general workflow --> register NFT, register IPA (can do both at once as well potentially), attach license terms, place on marketplace

//undefined for txHash cuz already registered
//this is how to register the IPA
const response = await client.ipAsset.register({
  nftContract: "0x0f00a58A741aD6C9DFb549e8B0aad1e9bC48D9f1", // your NFT contract address
  tokenId: "44", // your NFT token ID
  txOptions: { waitForTransaction: true },
});

console.log(
  `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId} `
);

const ipaID = response.ipId?.toString() || " ";
console.log(ipaID);

//License terms have already been attached, so it throws the error
//This is how we attach license terms
try {
  const response = await client.license.attachLicenseTerms({
    licenseTermsId: "1",
    ipId: `0x${ipaID}`, // Add the prefix '0x' before ipaID
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `Attached License Terms to IPA at transaction hash ${response.txHash}.`
  );
} catch (e) {
  console.log(`License Terms already attached to this IPA.`);
}

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div className={styles.container}>
      <title>Story Protocol Marketplace</title>
      <div className="m-6">
        <ConnectButton />
      </div>
      <p className="bg-blue-100 m-6 p-6">
        Story Protocol Marketplace {account.address}
      </p>
      <p className="bg-red-100 m-6 p-6">
        Currently getting: Root IPA created at transaction hash undefined, IPA
        ID: 0x234B4a0bBC330598aCe669616B9Eff465bd4F3ea -- this is because this
        transaction has already been registered (taken from docs)
      </p>
      <Link
        href={
          "https://explorer.storyprotocol.xyz/ipa/0x7241771200d2Fdf8a7a5ffb023d651e288C7940b"
        }
        className="bg-green-100 m-6 p-6 flex justify-center"
      >
        Minted NFT (Click to be directed)
      </Link>
    </div>
  );
};

export default Home;
