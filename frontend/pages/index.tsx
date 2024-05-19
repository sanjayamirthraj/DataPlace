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
const registerIPA = async () => {
  const response = await client.ipAsset.register({
    nftContract: "0x106C471e78Ea840FC0EB8296a9bc0D6024B367E3", // your NFT contract address
    tokenId: "0", // your NFT token ID
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId} `
  );
};

//await registerIPA();

//License terms have already been attached, so it throws the error
//This is how we attach license terms
const attachLicenseTerms = async () => {
  try {
    const response = await client.license.attachLicenseTerms({
      licenseTermsId: "2",
      ipId: "0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2", // Add the prefix '0x' before ipaID
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Attached License Terms to IPA at transaction hash ${response.txHash}.`
    );
  } catch (e) {
    console.log(e);
  }
};

//await attachLicenseTerms();

const mintLicenseTokens = async () => {
  const responsetoken = await client.license.mintLicenseTokens({
    licenseTermsId: "2",
    licensorIpId: "0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2",
    receiver: "0x60d6252fC31177B48732ab89f073407788F09C61",
    amount: 0,
    txOptions: { waitForTransaction: true },
  });

  console.log(
    `License Token minted at transaction hash ${responsetoken.txHash}, License ID: ${responsetoken.licenseTokenId}`
  );
};

//await mintLicenseTokens();

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div className={styles.container}>
      <title>Story Protocol Marketplace</title>
      <div className="m-6">
        <ConnectButton />
      </div>
      <p className="bg-blue-100 m-6 p-6">
        Story Protocol Marketplace ({account.address} connected)
      </p>
      <p className="bg-red-100 m-6 p-6">
        Created NFT (Click link below to see) Then attached license and minted
        tokens
      </p>
      <Link
        href={
          "https://explorer.storyprotocol.xyz/ipa/0x8E1E91465503Dc760853e4C4017A04eeb7d4d1D2"
        }
        className="bg-green-100 m-6 p-6 flex justify-center"
      >
        Minted NFT (Click to be directed)
      </Link>
      <Link
        href={
          "https://explorer.storyprotocol.xyz/transactions/0xca2ff2f6c0752fbb957f05b0216a401c17d40111f984d6cc16b0666274d72cc1"
        }
        className="bg-green-100 m-6 p-6 flex justify-center"
      >
        Transaction that license token had terms attached
      </Link>
      <p>
        License Token minted at transaction hash
        0x0802b6b5aba67fdde683f55886d9661b16207bb1093927589c2fe81eb4ecf21e,
        License ID: 1195
      </p>
    </div>
  );
};

export default Home;
