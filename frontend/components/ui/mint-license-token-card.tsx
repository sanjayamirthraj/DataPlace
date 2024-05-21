"use client";

import { AttachLicenseForm } from "./attach-license-terms-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { MintTokenForm } from "./mint-license-tokens-form";
export default function MintTokenCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register IP</CardTitle>
      </CardHeader>
      <CardContent>
        <MintTokenForm />
      </CardContent>
    </Card>
  );
}
