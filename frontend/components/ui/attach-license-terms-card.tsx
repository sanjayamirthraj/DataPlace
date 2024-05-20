import { AttachLicenseForm } from "./attach-license-terms-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { RegisterForm } from "./register-form";
export default function RegisterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register IP</CardTitle>
      </CardHeader>
      <CardContent>
        <AttachLicenseForm />
      </CardContent>
    </Card>
  );
}
