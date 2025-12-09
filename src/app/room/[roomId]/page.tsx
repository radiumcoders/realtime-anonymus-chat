"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { time } from "console";
import { useParams } from "next/navigation";
import { useState } from "react";

function formatTimeRemaining(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function page() {
  //get the roomId from the url
  const param = useParams();
  const roomId = param.roomId;

  const [copyStatus, setCopyStatus] = useState("copy");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  function copyLink() {
    //copy the room id to the clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopyStatus("copied!");
    setTimeout(() => {
      setCopyStatus("copy");
    }, 2000);
  }

  return (
    <main className="h-screen max-h-screen w-full flex flex-col">
      <header className="w-full p-4 border-b border-b-muted/50 flex items-center justify-between">
        <div className="flex gap-4">
          <div>
            <p className="uppercase text-sm ">room id:</p>
            <div className="flex gap-3 items-center justify-center">
              <div className="dark:text-green-300 text-green-800">{roomId}</div>
              <Button
                onClick={copyLink}
                // size={"sm"}
                className="p-1 size-fit text-xs rounded-xs bg-primary/10 hover:bg-primary/15 text-primary/90 uppercase"
              >
                {copyStatus}
              </Button>
            </div>
          </div>
          <div className="h-11 w-px bg-primary/15" />
          <div className="flex flex-col">
            <span className="text-primary/80 capitalize">self-destruct in</span>
            <span
              className={cn(
                "text-sm font-bold flex items-center gap-2",
                timeRemaining !== null && timeRemaining <= 60
                  ? "text-red-500"
                  : "dark:text-yellow-500/90 text-yellow-700"
              )}
            >
              {timeRemaining !== null
                ? formatTimeRemaining(timeRemaining)
                : "--:--"}
            </span>
          </div>
        </div>
        <div>
          <Button variant={"destructive"} className="rounded-xs">
            DESTROY NOW
          </Button>
        </div>
      </header>
      {/* chat interface */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"></div>
      {/* chat message interface */}
      <div className="p-4 border-t border-primary/20">
        <div className="flex-1 group  relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">
            {">"}
          </span>
          <Input className="w-full rounded-xs"></Input>
        </div>
      </div>
    </main>
  );
}

export default page;
