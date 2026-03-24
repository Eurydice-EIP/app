"use client";

import { cn } from "@/lib/utils";
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("register");
  let email = "";
  let password = "";
  let confirmPassword = "";
  let username = "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await register({ email, password, confirmPassword, username });
    localStorage.setItem("token", (res as any).accessToken);

    window.location.href = "/";
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
                <FieldLabel htmlFor="name">{t("fullName")}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={(e) => (username = e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => (email = e.target.value)}
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
                      required
                      onChange={(e) => (password = e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      {t("confirmPassword")}
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      onChange={(e) => (confirmPassword = e.target.value)}
                    />
                  </Field>
                </Field>
                <FieldDescription>{t("passwordHint")}</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">{t("submit")}</Button>
                <FieldDescription className="text-center">
                  {t("hasAccount")} <a href="/login">{t("signIn")}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t.rich("termsText", {
          termsOfService: (chunks) => <a href="#">{chunks}</a>,
          privacyPolicy: (chunks) => <a href="#">{chunks}</a>,
        })}
      </FieldDescription>
    </div>
  );
}
