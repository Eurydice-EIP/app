"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/auth";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ErrorAlertDialog } from "./ui/error-alert";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("register");
  const tGlob = useTranslations("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = { email, password, confirmPassword, username };

    if (data.password !== data.confirmPassword) {
      setErrorMessage(t("passwordsMismatch"));
      setErrorOpen(true);
      return;
    }

    try {

      const res = await register({ email, password, confirmPassword, username });
      localStorage.setItem("token", res.accessToken);
      window.location.href = "/";

    } catch (err) {

      setErrorMessage(tGlob("unknownError"));
      setErrorOpen(true);

      if (!(err instanceof Error)) {
        return;
      }

      if (err.cause === 400) {
        setErrorMessage(t("passwordsMismatch"));
      }

      if (err.cause === 409) {
        if (err.message.toLowerCase().includes("username")) {
          setErrorMessage(t("conflictUsername"));
        } else {
          setErrorMessage(t("conflictEmail"));
        }
      }

    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t("username")}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      minLength={10}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      {t("confirmPassword")}
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      minLength={10}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Field>
                </Field>
                <FieldDescription>{t("passwordHint")}</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">{t("submit")}</Button>
                <FieldDescription className="text-center">
                  {t("hasAccount")} <Link href="/login">{t("signIn")}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <ErrorAlertDialog open={errorOpen} onOpenChange={setErrorOpen} title={t("errorDialTitle")} description={errorMessage} />

      <FieldDescription className="px-6 text-center">
        {t.rich("termsText", {
          termsOfService: (chunks) => <a href="#">{chunks}</a>,
          privacyPolicy: (chunks) => <a href="#">{chunks}</a>,
        })}
      </FieldDescription>
    </div>
  );
}
