"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";

//store some of the nice usernames in array
const USER_ARRAY = ["mango", "penguin", "owl", "cat", "lion"];
// key that will be used to store the username,refreshed in the local storage
const STORAGE_KEY = "username";

function generateRandomUsername() {
  //select a random index form the USER_ARRAY array :]
  const random_index = Math.floor(Math.random() * USER_ARRAY.length);
  //generate a random username with a random id of length 2
  const username = `anonymous-${USER_ARRAY[random_index]}-${nanoid(2)}`;
  return username;
}

function refreshedUsername() {
  //generate a new username
  const new_username = generateRandomUsername();
  return new_username;
}

export default function Home() {
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
      }
      //generate a new username and store it to localstorage ;]
      const generated = generateRandomUsername();
      localStorage.setItem(STORAGE_KEY, generated);
      setUsername(generated);
    }

    main();
  }, []);
  return (
    <main className="min-h-screen flex flex-col gap-4 justify-center items-center w-full bg-background">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="font-bold text-xl text-center text-green-500">
          {"> "}Welcome to Secure Room
        </h1>
        <p className="text-stone-500 text-sm">self destructive private chat room.</p>
      </div>
      {/* outer most box */}
      <div className="bg-primary/5 border border-primary/10 p-4 gap-5 justify-center flex flex-col rounded-xs ">
        <div className="flex flex-col gap-3">
          <Label className="text-primary/30 font-light">Your Identity</Label>
          <div className="flex gap-2 w-full">
            <Input
              className="rounded-xs shadow-2xs w-fit"
              type="text"
              placeholder={username}
              disabled={true}
            />
            <Button
              onClick={() => {
                if (refreshed >= 3) return;
                const new_username = refreshedUsername();
                setUsername(new_username);
                setRefreshed((prev) => prev + 1);
                console.log("refreshed", refreshed);
              }}
              disabled={refreshed >= 3}
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
        <p className="text-sm text-primary/50 text-center">
          {3 - refreshed} Username refreshes.
        </p>
      </div>
    </main>
  );
}
