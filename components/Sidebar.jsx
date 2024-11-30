import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Layout, Shield } from "lucide-react";
import { Progress } from "./ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";

const Sidebar = () => {
  return (
    <div className="shadow-sm h-screen p-7">
      <Image src={"/logo.svg"} alt="logo" width={170} height={120} />
      <div className="mt-10">
        <UploadPdfDialog>
          <Button classNamew-full>+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 out of 5 Pdf Uploaded</p>
        <p className="text-sm text-gray-400 mt-1">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
};

export default Sidebar;
