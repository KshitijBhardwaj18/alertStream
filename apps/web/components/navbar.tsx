import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="h-[70px] shadow-lg flex">
      <div className="h-full w-full flex flex-row flex-grow justify-between items-center mx-[4rem]">
        <div className="flex flex-row items-center justify-evenly gap-4 ml-[6rem] ">
          <div className="font-bold flex flex-row items-center gap-1">
            <p className="text-[30px]">⚡</p>
            <p className="font-bold">AlertStream</p>
          </div>

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

        <div className="flex flex-row gap-2 items-center mr-[3rem] ">
          <button>
            <p className="text-[1rem] text-[#5d5c5c] hover:text-black ">
              Sign in
            </p>
          </button>

          <span className="text-sm text-[#5d5c5c] ">or</span>

          <button>
            <p className="text-[1rem] text-[#5d5c5c] hover:text-black ">
              Register
            </p>
          </button>

          <Button className="bg-[#ffecd0] hover:bg-[#fde5c1] ml-3 text-[#ffa119] text-xl font-bold">
            Premium
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
