"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";

const UploadPdfDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl)
  const {user} = useUser()
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true)
    const postUrl = await generateUploadUrl()
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });

    const { storageId } = await result.json();
    console.log("StorageId", storageId)
    const fileId = uuid4();
    const fileUrl  =await getFileUrl({storageId: storageId})
    const res = await AddFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName??'Untitled File',
      fileUrl: fileUrl,
      createBy: user?.primaryEmailAddress?.emailAddress
    })
    console.log(res)
    setLoading(false)
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <div>
                <h2 className="mt-5">Select a file to upload</h2>
                <div className="gap-2 p-3 rounded-md border">
                  <input type="file" accept="application/pdf" onChange={(event) => OnFileSelect(event)} />
                </div>
                <div className="mt-2">
                  <label>File Name</label>
                  <Input placeholder="File Name" onChange={(e)=> setFileName(e.target.value)}/>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                close
              </Button>
            </DialogClose>
            <Button onClick={OnUpload}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPdfDialog;
