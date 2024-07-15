

import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {};

const LandingPage = (props: Props) => {
  
  return (
    <div>
      <section
        className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full bg-[url('/grid.svg')]"
        id="hero"
      >
        <h1 className="text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6">
        ⚡ AlertStream: Real-time connections,<br/>effortlessly delivered.
        </h1>
        <p className="max-w-[600px] mt-4 text-center text-gray-500 md:textl-xl">
          Send pings to your friends, family, or colleagues in real-time.
        </p>
        
        <div className="w-full bg-gradient-to-b from-transparent to-white h-24"></div>
      </section>
      <section
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        id="features"
      >
        <h2 className="text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl">
          Why you should hire me ?
        </h2>
        <ul className="grid gap-4 grid-cols-1 md:gridcols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/images/app/demo2.jpg"
              width="250"
              height="250"
              alt="create a form"
              className="bg-white p-4 shadow-sm border rounded-md"
            />
            <Image
              src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
            />
            <p className="font-bold">1. Extremely motivated and bilieve in delivering more than the job scope </p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/images/app/demo1.jpg"
              width="180"
              height="200"
              alt="update the form"
              className="bg-white p-4 shadow-sm border rounded-md"
            />
            <Image
              src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180"
            />
            <p className="font-bold">2. Familier with latest tech stacks and ready to learn on the go.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative ">
            <Image
              src="/images/app/demo3.webp"
              width="250"
              height="250"
              alt="check the analytics"
              className="bg-white p-4 shadow-sm border rounded-md py-[3rem]"
            />
            <p className="font-bold">3. The most important one I am young and thirsty will get the work done at no cost.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LandingPage;
