"use client"

import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type ConfirmAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionLabel?: string;
  action?: any;
};

export function ConfirmAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  action = () => {},
}: ConfirmAlertDialogProps) {
  const tCom = useTranslations("common");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="justify-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-8 sm:justify-center">
          <AlertDialogAction variant="outline" onClick={() => onOpenChange(false)}>
            {tCom("cancel")}
          </AlertDialogAction>
          <AlertDialogAction variant="destructive" onClick={() => {onOpenChange(false); action();}}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
