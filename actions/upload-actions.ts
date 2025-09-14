"use server";

import { fetchAndExtractPdf } from "@/lib/langchain";

export async function generatePDFSummary(
  uploadResponse: { serverData: { userId: string; fileUrl: string } }[]
) {
  if (!uploadResponse) {
    return { success: false, message: "File Upload failedd", data: null };
  }
  console.log("hiii"+uploadResponse[0]);
  const {
    serverData: { userId, fileUrl },
  } = uploadResponse[0];
  console.log("hello"+fileUrl)
  if (!fileUrl) {
    return { success: false, message: "File upload failed", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdf(fileUrl);
//     console.log({ pdfText });

    return { success: true, message: "PDF processed", data: pdfText };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error extracting PDF", data: null };
  }
}
