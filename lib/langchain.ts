import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


export async function fetchAndExtractPdf(fileUrl:string) {
        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const arraybuffer = await blob.arrayBuffer();

        const loader = new PDFLoader(new Blob([arraybuffer]));

        const docs = await loader.load();

        return docs.map((doc)=> doc.pageContent).join('/n');
}
