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
import { Button } from "../components/ui/button";
import { RegisterForm } from "../components/ui/register-form";
import RegisterCard from "../components/ui/register-card";
import { AttachLicenseForm } from "../components/ui/attach-license-terms-form";
import AttachLicenseCard from "../components/ui/attach-license-terms-card";

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

      <div className="grid m-6 p-6" style={{ display: "flex", gap: "1rem" }}>
        <RegisterCard />
        <AttachLicenseCard />
      </div>
    </div>
  );
};

export default Home;
