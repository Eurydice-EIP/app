"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/types/entities/user";
import { useTranslations } from "next-intl";
import { dropZoneAvatar } from "@/components/drop-zone-avatar";
import { Spinner } from "@/components/ui/spinner";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { postUserAvatar, updateUser } from "@/lib/user";

export function DialogUpdateUser({
  user,
  onUserUpdated,
}: {
  user?: User;
  onUserUpdated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [usernameError, setUsernameError] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const t = useTranslations("account");

  const handleFileSelect = (file: File, preview: string) => {
    setAvatarFile(file);
    setAvatarPreview(preview);
  };

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError(true);
      isValid = false;
    } else {
      setUsernameError(false);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Update username first
      if (username.trim()) {
        await updateUser({ username });
      }

      // Upload avatar separately via FormData
      if (avatarFile) {
        await postUserAvatar(avatarFile);
      }

      toast.success("User updated successfully!");
      setOpen(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      onUserUpdated?.();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="size-4 mr-2" />
          {t("editProfile")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("editProfile")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">{t("username")}</FieldLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
              {usernameError && <FieldError>{t("required")}</FieldError>}
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel>{t("avatar")}</FieldLabel>
              <div className="bg-muted rounded-lg p-4">
                {dropZoneAvatar({ onFileSelect: handleFileSelect })}
              </div>
              {avatarFile && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950 rounded-md border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <span className="font-semibold">Selected avatar:</span>{" "}
                    {avatarFile.name}
                  </p>
                </div>
              )}
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner className="mr-2 size-4" />
                {t("saving")}
              </>
            ) : (
              t("save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
