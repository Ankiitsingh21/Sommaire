"use client";
import { z } from "zod";
import UploadFormInput from "./upload-formInput";
import { useUploadThing } from "@/utils/uploadthings";
import { toast } from "sonner";
import {
  generatePDFSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef } from "react";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing("PDFUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error(`Error occurred while uploading: ${err.message}`);
    },
    onUploadBegin: (file) => {
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
    //     console.log(validatedFields);

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
    // console.log({resp});
    const summary = await generatePDFSummary(resp);
    // console.log({summary});

    const { data = null, message = null } = summary || {};
    // if(data){
    //   console.log("Summary:", data.summary);
    // }
    // console.log("File URL:", resp[0].serverData.file.url);
    // console.log("Title:", resp[0].name);
    // console.log("File Name:", file.name);
    if (data) {
      let storeResult: any;
      toast(
        <div>
          <strong>📄 Saving PDF...</strong>
          <div>Hang tight! We are saving your summary! ✨</div>
        </div>,
      );
      const FileName = formatFileNameAsTitle(resp[0].name);
      if (data.summary) {
        storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: resp[0].serverData.file.url,
          title: FileName,
          fileName: file.name,
        });
        toast(
          <div>
            <strong>✨ Summary saved!</strong>
            <div>Your summary has been saved! ✨</div>
          </div>,
        );
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`)
      }
    }
    // console.log('hello');
    // console.log({summary})

    // TODO: Save summary to database and redirect to summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
