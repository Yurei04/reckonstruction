"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Threads from "@/components/effects/threads";

export default function HomepageMain() {
  return (
    <section className="relative min-h-screen w-full overflow-x-hidden text-amber-100">
      <div  className="pointer-events-none fixed inset-0 z-[-1] ">
          <Threads
              amplitude={1}
              distance={1}
              enableMouseInteraction={false}
          />
      </div>

      <div className="container mx-auto pt-32  px-4 sm:px-8 lg:px-12 flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              ReckonStruction
            </span>
          </h1>

          <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium text-amber-200">
            Reconstructing employment access — for everyone.
          </h2>

          <p className="mt-3 text-sm text-amber-300">
            A platform that checks your job fit fairly, and builds a custom plan if you're not ready yet.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="#eligibility">
              <Button size="lg" className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-black">
                ReckonStruct Now!
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="cursor-pointer bg-amber-950 border-amber-500 text-amber-300 hover:bg-amber-500 hover:text-black">
                Browse Our Library
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-amber-500 bg-[#181818] shadow-xl overflow-hidden"
        >
          <Image
            src="/images/logo.png"
            alt="reckonStruction Logo"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
