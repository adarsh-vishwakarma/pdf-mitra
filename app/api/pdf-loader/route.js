import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl =
  "https://small-perch-713.convex.cloud/api/storage/6de5f9e4-635e-4e24-94a3-af25f527f619";
export async function GET(req) {
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((docs) => {
    pdfTextContent = pdfTextContent + docs.pageContent;
  });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const output = await splitter.createDocuments([pdfTextContent]);

  let splitterList = [];
  output.forEach(doc => {
    splitterList.push(doc.pageContent)
  })
  return NextResponse.json({ result: splitterList });
}
