import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";



const Navbar = async () => {
  const session = await auth();
  const token = await auth();
 
  console.log(token);
  return (
    <div className="h-[70px] shadow-lg flex">
      <div className="h-full w-full flex flex-row flex-grow justify-between items-center mx-[4rem]">
        <div className="flex flex-row items-center justify-evenly gap-4 ml-[6rem] ">
        <Link href="/">
          <div className="font-bold flex flex-row items-center gap-1">
            
            <p className="text-[30px]">⚡</p>
            <p className="font-bold">AlertStream</p>
            
          </div>
          </Link>

          {/* <div className="flex flex-row gap-4">
            <Link href="/">
              <p className="text-[#5d5c5c] text-lg hover:text-black ">
                Problems
              </p>
            </Link>

            <Link href="/">
              <p className="text-[#5d5c5c] text-lg hover:text-black ">
                Contest
              </p>
            </Link>

            <Link href="/">
              <p className="text-[#5d5c5c] text-lg hover:text-black ">
                Discuss
              </p>
            </Link>
          </div> */}
        </div>
        {!session ? (
          <div className="flex flex-row gap-2 items-center mr-[3rem] ">
            <Link href="/auth/login">
            <Button
              className="bg-[#fca063] text-black hover:text-white px-10 "
            >
              Login
            </Button> 
          </Link>

            <span className="text-sm text-[#5d5c5c] ">or</span>

            <Link href="/auth/register">
            <Button
              className="bg-[#fca063] text-black hover:text-white px-10 "
            >
              Sign Up
            </Button> 
          </Link>
          </div>
        ) : (

          <div className="flex flex-row gap-3">
          <Link href="/dashboard">
            <Button
              className="bg-[#fca063] text-black hover:text-white px-10 "
            >
              Dashboard
            </Button> 
          </Link>
          <form action={async () => {
            "use server";

            await signOut();
        }}
        >
            <Button
              className="bg-[#fca063] text-black hover:text-white px-10 "
              type="submit"
            >
              Logout
            </Button> 
        </form>
         
          </div>

            

          
        )}
      </div>
    </div>
  );
};

export default Navbar;
