import ConstructButton from "@/components/reckonComponents/contructButton";
import ReckonButton from "@/components/reckonComponents/reckonButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReckonMain () {
    return (
        <div className="w-full min-h-screen p-0 m-0 flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 flex flex-col items-center justify-center border border-white rounded-3xl p-4 m-4">
                <ReckonButton 
                    label={"Search"}
                />
                <ConstructButton
                
                />
            </div>
        </div>
    )
}