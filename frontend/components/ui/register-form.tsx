"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { client } from "../../config";
import { useState } from "react";
import { Link } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  tokenID: z.string().min(1, {
    message: "must be at least 2 characters.",
  }),
});

export function RegisterForm() {
  const [ipaID, setIpaID] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      tokenID: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setMessage("Loading...");
    const nftContractValue = values.username.replace(/^0x/, "");

    const tokenIdValue = values.tokenID;
    const response = await client.ipAsset.register({
      nftContract: `0x${nftContractValue}`, // your NFT contract address
      tokenId: tokenIdValue, // your NFT token ID
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId} `
    );
    console.log(values);
    if (response.txHash && response.ipId) {
      setMessage(
        `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId}`
      );
    } else {
      setMessage(`Asset has already been registered, IPA ID: ${response.ipId}`);
    }
    setIpaID((response.ipId ?? "").toString());
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Contract Address </FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x106C471e78Ea840FC0EB8296a9bc0D6024B367E3"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter NFT Contract Address</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token ID</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                  Enter Token ID Number of the NFT you want to register
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <a href={`https://explorer.storyprotocol.xyz/ipa/${ipaID}`}>
        {message !== "" ? <p className="p-3">{message}</p> : null}
      </a>
    </div>
  );
}
