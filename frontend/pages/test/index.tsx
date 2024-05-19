import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import Link from "next/link";

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <div>
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
      <div
        className="grid m-6 p-6"
        style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
      ></div>
    </div>
  );
};

export default Home;
