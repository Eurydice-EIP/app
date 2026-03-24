import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-toggle";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <div className="flex h-full w-full flex-col gap-8 p-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t("language")}
        </h2>
        <LanguageSwitcher />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {t("theme")}
        </h2>
        <ThemeToggle />
      </section>
    </div>
  );
}
