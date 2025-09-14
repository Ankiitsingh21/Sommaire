"use client";
import { z } from "zod";
import { useState } from "react";
import UploadFormInput from "./upload-formInput";
import { useUploadThing } from "@/utils/uploadthings";
import { toast } from "sonner";

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
  const { startUpload, routeConfig } = useUploadThing("PDFUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error(`Error occurred while uploading: ${err.message}`);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // Validating the fields
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);

    // Schema validation with zod
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
    toast(
       <div>
         <strong>📄 Uploading PDF</strong>
         <div>Hang tight! we are uploadig your pdf✨</div>
       </div>,
     );
    
    //then upload the file to uploadthing
    
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
//then parse the pdf using langchain
     toast(
       <div>
         <strong>📄 Processing PDF</strong>
         <div>Hang tight! Our AI is reading through your document! ✨</div>
       </div>,
     );
    //summarize the pdf using AI
    //save the summary to the database
    //redirect to the summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
