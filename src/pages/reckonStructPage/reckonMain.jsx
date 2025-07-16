"use client"
import SplitText from "@/components/effects/splittText";
import Threads from "@/components/effects/threads";
import ConstructButton from "@/components/reckonComponents/contructButton";
import ReckonButton from "@/components/reckonComponents/reckonButton";

export default function ReckonMain () {
    return (
        <div className="w-full min-h-screen p-0 m-0 flex flex-col items-center justify-center">
            <div  className="pointer-events-none fixed inset-0 z-[-1] ">
                <Threads
                    amplitude={1}
                    distance={1}
                    enableMouseInteraction={false}
                />
            </div>
            <SplitText
            text="ReckonStruction"
            className="text-5xl font-semibold text-center text-amber-200"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
            <div className="w-1/2 h-1/2 bg-amber-300/10 backdrop-blur-sm flex flex-row items-center justify-center border gap-4 border-amber-300/20 rounded-3xl p-4 m-4 z-10">
                <ReckonButton 
                    label={"Search"}
                />
            </div>
        </div>
    )
}