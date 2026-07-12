"use client";
import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { CloudUploadIcon, Trash2Icon } from "lucide-react";

export function dropZoneAvatar({
  onFileSelect,
}: {
  onFileSelect?: (file: File, preview: string) => void;
} = {}) {
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const preview = URL.createObjectURL(file);
      onFileSelect?.(file, preview);
      return {
        status: "success",
        result: preview,
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 1,
    },
  });

  return (
    <div className="not-prose flex flex-col gap-4">
      <Dropzone {...dropzone}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <DropzoneDescription className="text-base">
              Upload your avatar
            </DropzoneDescription>
            <DropzoneMessage />
          </div>
          {dropzone.fileStatuses.length === 0 && (
            <DropZoneArea>
              <DropzoneTrigger className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <CloudUploadIcon className="size-10 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">
                    Drop your avatar here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to select an image
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, or JPEG (max 10 MB)
                  </p>
                </div>
              </DropzoneTrigger>
            </DropZoneArea>
          )}
        </div>

        <DropzoneFileList className="flex flex-col gap-4">
          {dropzone.fileStatuses.map((file) => (
            <DropzoneFileListItem
              className="overflow-hidden rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              key={file.id}
              file={file}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="shrink-0">
                  {file.status === "pending" && (
                    <div className="size-24 rounded-full animate-pulse bg-muted" />
                  )}
                  {file.status === "success" && (
                    <img
                      src={file.result}
                      alt={`avatar-${file.fileName}`}
                      className="size-24 rounded-full object-cover border-2 border-border"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  {file.status === "success" && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✓ Upload possible
                    </p>
                  )}
                  {file.status === "pending" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploading...
                    </p>
                  )}
                </div>
                <DropzoneRemoveFile
                  variant="ghost"
                  className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2Icon className="size-5" />
                </DropzoneRemoveFile>
              </div>
            </DropzoneFileListItem>
          ))}
        </DropzoneFileList>
      </Dropzone>
    </div>
  );
}
