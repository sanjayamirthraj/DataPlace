import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { client } from "../config";

const response = await client.ipAsset.register({
  nftContract: "0xd516482bef63Ff19Ed40E4C6C2e626ccE04e19ED", // your NFT contract address
  tokenId: "12", // your NFT token ID
  txOptions: { waitForTransaction: true },
});

console.log(
  `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
);

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div className={styles.container}>
      <title>Story Protocol Marketplace</title>
      <ConnectButton />
      <p className="bg-red-100">Story Protocol Marketplace {account.address}</p>
      <p>
        Currently getting: Root IPA created at transaction hash undefined, IPA
        ID: 0x234B4a0bBC330598aCe669616B9Eff465bd4F3ea but should also be
        getting the transaction hash
      </p>
    </div>
  );
};

export default Home;
