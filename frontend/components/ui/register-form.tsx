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
import { storage } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "must be at least 2 characters.",
  }), 
  tokenID: z.coerce.number({
    message: "must be a number",
  }),
  file: z.any()
});

export function RegisterForm() {
  const [ipaID, setIpaID] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      file: null,
    },
  });

  const acceptedFileTypes = ["text/plain", "text/csv", "application/pdf"];

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setMessage("Loading...");
      if (!values.file || values.file.length === 0) {
        setMessage("Please upload a file.");
        return;
      }
      const file = values.file[0];
      if (!acceptedFileTypes.includes(file.type)) {
        setMessage("Please upload a .txt, .csv, or .pdf file.");
        return;
      }
      const nftContractValue = values.username.replace(/^0x/, "");

      const tokenIdValue = values.tokenID;
      console.log("about to register asset...");
      const response = await client.ipAsset.register({
        nftContract: `0x${nftContractValue}`, // your NFT contract address
        tokenId: tokenIdValue, // your NFT token ID
        txOptions: { waitForTransaction: true },
      });
      console.log(response);
      if (response.txHash && response.ipId) {
        const fileRef = ref(storage, `files/${response.ipId}`);
        await uploadBytesResumable(fileRef, file).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("File available at", downloadURL);
          setMessage(`Root IPA created with file at URL: ${downloadURL}`);
        });
      }

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
    } catch (error) {
      console.error("Error registering asset", error);
      setMessage("Error registering asset");
    }
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
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input type="file" {...form.register("file")} accept=".txt,.csv,.pdf" />
                </FormControl>
                <FormDescription>Upload your data file represented by the NFT.</FormDescription>
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
