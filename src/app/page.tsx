"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";

//store somw of the nice usernames in array
const USERCHAN = [
  "dancing-mango",
  "flying-penguin",
  "sleepy-owl",
  "curious-cat",
  "brave-lion",
];
// key that will be used to store the username in the local storage
const STORAGE_KEY = "username";

export default function Home() {
  function generateRandomUsername() {
    //select a random index form the USERCHAN array :]
    const random_index = Math.floor(Math.random() * USERCHAN.length);
    //generate a random username with a random id of length 4
    const username = `ananymous-${USERCHAN[random_index]}-${nanoid(4)}`;
  }
  //store the username in a state
  const [username, setUsername] = useState("");
  //allow only 3 refreshes of the username
  const [refreshed, setRefreshed] = useState(0);
  useEffect(() => {
    function main() {
      //check if the username is already stored in the local storage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        //set the username from the local storage is exists and return :]
        setUsername(stored);
        return;
      }
    };

    main();
  });
  return (
    <main className="min-h-screen flex justify-center items-center w-full bg-background">
      <div className="bg-primary/5 border border-primary/10 p-4 gap-5 flex flex-col rounded-xs">
        <div className="flex flex-col gap-3">
          <Label className="text-primary/30 font-light">Your Identity</Label>
          <div className="flex gap-2">
            <Input
              className="rounded-xs shadow-2xs"
              type="text"
              placeholder={username}
              disabled={true}
            />
            <Button
              onClick={() => {
                if (refreshed >= 3) return;
                setRefreshed(refreshed + 1);
                console.log("refreshed", refreshed);
              }}
              className="rounded-xs bg-transparent text-primary/30 hover:text-primary/90"
              variant={"outline"}
            >
              <RotateCw />
            </Button>
          </div>
        </div>
        <Button className="uppercase rounded-xs shadow-2xl selection:bg-background selection:text-primary">
          create secure room
        </Button>
        {refreshed > 0 && (
          <p className="text-sm text-primary/50 text-center">
            {3 - refreshed} Username refresh.
          </p>
        )}
      </div>
    </main>
  );
}
