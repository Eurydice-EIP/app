"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchTo = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={currentLocale === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => switchTo("en")}
      >
        🇬🇧 English
      </Button>
      <Button
        variant={currentLocale === "fr" ? "default" : "outline"}
        size="sm"
        onClick={() => switchTo("fr")}
      >
        🇫🇷 Français
      </Button>
    </div>
  );
}
