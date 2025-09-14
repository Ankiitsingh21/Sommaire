"use client";
import { z } from "zod";
import UploadFormInput from "./upload-formInput";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 24 * 1024,
      "File Size must be less than 20 MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    //validating the fields;
    const validatedFields = schema.safeParse({file});
    console.log(validatedFields);
    //schema validation with zod
    if(!validatedFields.success){
        console.log(
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File'
        );
        return ;
    }
    //then upload the file to uploadthing
    //then parse the pdf using langchain
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
