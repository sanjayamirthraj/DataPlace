"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function RegisterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await client.ipAsset.register({
      nftContract: "0x106C471e78Ea840FC0EB8296a9bc0D6024B367E3", // your NFT contract address
      tokenId: "0", // your NFT token ID
      txOptions: { waitForTransaction: true },
    });

    console.log(
      `Root IPA created at transaction hash ${response.txHash}, IPA ID: ${response.ipId} `
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NFT Contract Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="0x106C471e78Ea840FC0EB8296a9bc0D6024B367E3"
                  {...field}
                />
              </FormControl>
              <FormLabel>Token ID</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
