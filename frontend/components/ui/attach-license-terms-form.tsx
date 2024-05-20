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
  licenseTermsId: z.string(),
});

export function AttachLicenseForm() {
  const [responseMessage, setResponse] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      licenseTermsId: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ipIDValue = values.username;
    const licenseTermsIdValue = values.licenseTermsId;
    console.log(values);

    try {
      const response = await client.license.attachLicenseTerms({
        licenseTermsId: licenseTermsIdValue,
        ipId: `0x${ipIDValue}`, // Add the prefix '0x' before ipaID
        txOptions: { waitForTransaction: true },
      });

      console.log(
        `Attached License Terms to IPA at transaction hash ${response.txHash}.`
      );
      setResponse(
        `Attached License Terms to IPA at transaction hash ${response.txHash}.`
      );
    } catch (e) {
      console.log(e);
      setResponse("License Terms already attached to IPA");
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
                <FormLabel>IP ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x106C471e78Ea840FC0EB8296a9bc0D6024B367E3"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter IP ID</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licenseTermsId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token ID</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormDescription>
                  Enter licensing terms you want to register
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {responseMessage !== "" && <p> {responseMessage}</p>}
    </div>
  );
}
