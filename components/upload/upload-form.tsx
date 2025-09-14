"use client";
import { z } from "zod";
import UploadFormInput from "./upload-formInput";
import { useUploadThing } from "@/utils/uploadthings";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload-actions";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File Size must be less than 20 MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("PDFUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error(`Error occurred while uploading: ${err.message}`);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
      toast(
        <div>
          <strong>📄 Uploading PDF</strong>
          <div>Hang tight! We are uploading your PDF ✨</div>
        </div>,
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validate the file
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);

    if (!validatedFields.success) {
      toast.error(
        <div>
          <strong>❌ Something went wrong</strong>
          <div>
            {validatedFields.error?.flatten().fieldErrors.file?.[0] ??
              "Invalid file"}
          </div>
        </div>,
      );
      return;
    }

    // Uploading toast
    toast(
      <div>
        <strong>📄 Uploading PDF</strong>
        <div>Hang tight! We are uploading your PDF ✨</div>
      </div>,
    );

    // Upload the file
    const resp = await startUpload([file]);
    if (!resp) {
      toast.error(
        <div>
          <strong>Something went wrong</strong>
          <div>Please use a different file</div>
        </div>,
      );
      return;
    }

    // Processing PDF toast
    toast(
      <div>
        <strong>📄 Processing PDF</strong>
        <div>Hang tight! Our AI is reading through your document! ✨</div>
      </div>,
    );

    // Generate summary
    const summary = await generatePDFSummary(resp);
    console.log({summary})

    // TODO: Save summary to database and redirect to summary page
    console.log("PDF summary:", summary);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
