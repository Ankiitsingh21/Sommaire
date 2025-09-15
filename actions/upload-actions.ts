"use server";

import { getData } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiAI";
import { fetchAndExtractPdf } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePDFSummary(
  uploadResponse: { serverData: { userId: string }; ufsUrl: string }[],
  // resp:any
) {
  // console.log(resp[0].name);
  if (!uploadResponse) {
    return { success: false, message: "File Upload failed", data: null };
  }

  //   console.log("hiii", uploadResponse[0]); // log object properly

  const {
    serverData: { userId },
    ufsUrl: fileUrl,
  } = uploadResponse[0];

  //   console.log("hello", fileUrl);

  if (!fileUrl) {
    return { success: false, message: "File upload failed", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdf(fileUrl);
    // console.log({pdfText});

    let summary;
    try {
      summary = await generateSummaryFromGemini(pdfText);
      // console.log({summary})
    } catch (error) {
      console.log(error);
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate  summary",
        data: null,
      };
    }

    // console.log('hiiii')
    // console.log({ summary });

    // const fileName =formatFileName(fileName);

    return {
      success: true,
      message: "Summary generated succesfully",
      data: {
        // title:fileName,
        summary,
      },
    };

    //     return { success: true, message: "PDF processed", data: pdfText };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error extracting PDF", data: null };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  title: string;
  fileName: string;
  summary: string;
}) {
  try {
    const sql = await getData();
    await sql`INSERT INTO pdf_summaries (
    user_id,
    original_file_url,
    summary_text,
    title,
    file_name
) VALUES (
    ${userId},                    -- user_id
    ${fileUrl},       -- original_file_url
    ${summary}, -- summary_text
    ${title},                          -- status (optional, default is 'completed')
    ${fileName}                            -- file_name
);
`;
  } catch (error) {
    console.log("Error saving pdf summary", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId?: string;
  fileUrl: string;
  title: string;
  fileName: string;
  summary: string;
}) {
  //user is logged in and has a userid
  //savrpdf summary();
  //save pdf also
  let savepdfSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "user NOt Found",
      };
    }
    savepdfSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      fileName,
      title,
    });

    // console.log({savepdfSummary});
    if (!savepdfSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary,Please try again",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }

  revalidatePath(`/summaries/${savepdfSummary.id}`)


   return {
      success: true,
      message: "PDF summary saved successfully",
      data:{
        id:savepdfSummary.id
      }
    };
}
