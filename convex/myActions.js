import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fieldId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,//Array
      args.fieldId,//String
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyD04N0MbHkFRfDX1wHgtHwtmBT0LW4efLs',
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "Completed.."
  },
});