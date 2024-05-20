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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "A must be at least 2 characters.",
  }),
  tokenID: z.string(),
});

export function RegisterForm() {
  const [ipaID, setIpaID] = useState<string>("");

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
    const nftContractValue = values.username;
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
                <FormLabel>NFT Contract Address (No 0x at the start)</FormLabel>
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
      {ipaID !== "" && (
        <p className="p-2">Transaction Success: IP ID: {ipaID}</p>
      )}
    </div>
  );
}
