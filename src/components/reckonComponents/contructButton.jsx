"use client"
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

export default function ConstructButton({ label, searchValue, clearSearch, database }) {
    const [profileData, setProfileData] = useState([]);
    const [deficits, setDeficits] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [fullProgress, setFullProgress] = useState([]);
    useEffect(() => {
        fetch("/data/profile.json")
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
            setProfileData(data[0]);
            }
        })
        .catch((error) => console.log("Profile DB error: ", error));
    }, []);

    function analyzeData(job) {
        if(!job || !profileData) {
            alert("Missing Data Detected");
            return;
        }
        const allProgress = [];
        const jobReq = job.requirements;
        const user = profileData;
        const userCap = user.capability;

        const gaps = [];

        ["hearing", "eyesight", "physicalStrength", "mentallyCapable"].forEach((field) => {
        allProgress.push({
            category: field,
            required: jobReq[field],
            youHave: userCap[field] ?? 0
        });
        });

        ["technologyComprehension", "readingComprehension"].forEach((field) => {
        allProgress.push({
            category: field,
            required: jobReq.comprehension?.[field],
            youHave: userCap.comprehension?.[field] ?? 0
        });
        });

        Object.keys(jobReq.education).forEach((level) => {
        const jobEdu = jobReq.education[level];
        const userEdu = userCap.education?.[level] ?? "no";
        if (jobEdu === "yes" && userEdu !== "yes") {
            gaps.push({
            category: `education (${level})`,
            required: jobEdu,
            youHave: userEdu,
            });
        }
        });

        const unfitConditions = job.unfit ?? [];
        const userUnfit = user.unifit ?? [];
        const conflict = userUnfit.find((cond) => unfitConditions.includes(cond));
        if (conflict) {
        gaps.push({
            category: "incompatibility",
            reason: `You may be unfit for this job due to: ${conflict}`,
        });
        setAlternatives(job.accessibleAlternatives || []);
        } else {
        setAlternatives([]);
        }
        setFullProgress(allProgress);
        setDeficits(gaps);
        setSuggestions(job.recommendations || []);
        setOpenDialog(true)

    
    }

    return (
       <div className="w-full min-h-screen flex flex-col items-center justify-center z-10 overflow-x-hidden p-4">
        <Button
            onClick={() => {
                const matchedJob = database.find(
                (job) => job.job.toLowerCase() === searchValue.toLowerCase()
                );

                if (!matchedJob) {
                alert("Job not found.");
                return;
                }

                analyzeData(matchedJob);
                clearSearch(); 
            }}
            >
            {label}
         </Button>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-full h-full p-6 bg-black/50 backdrop-blur-lg border border-white/10 text-amber-200 rounded-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">
                    Job Compatibility Results
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full flex flex-col lg:flex-row gap-8 mt-6">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        {fullProgress.length > 0 && (
                        <div className="space-y-4">
                            <p className="text-blue-400 font-semibold">Your Profile Status</p>
                            {fullProgress.map((gap, i) => {
                            const percentage = Math.min((gap.youHave / gap.required) * 100, 100);
                            const barColor = percentage >= 100 ? "bg-green-500" : "bg-red-500";

                            return (
                                <div key={i}>
                                <p className="text-sm font-medium mb-1">
                                    {gap.category} ({gap.youHave} / {gap.required})
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
                                </div>
                                </div>
                            );
                            })}
                        </div>
                        )}


                    {alternatives.length > 0 && (
                        <div className="space-y-2">
                        <p className="font-semibold text-orange-500">Accessible Alternatives:</p>
                        <ul className="list-disc list-inside text-sm">
                            {alternatives.map((alt, i) => (
                            <li key={i}>
                                <strong>{alt.job}</strong>: {alt.why}
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    {deficits.length > 0 && (
                        <div className="space-y-4">
                        <p className="text-blue-400 font-semibold">Your Profile Status</p>
                        {deficits.map((gap, i) => {
                            const percentage = gap.youHave * 10;
                            return (
                            <div key={i}>
                                <p className="text-sm font-medium mb-1">{gap.category} {gap.youHave}</p>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div className="h-full bg-blue-500" style={{ width: `${percentage}%` }} />
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    )}
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="w-full flex flex-col items-center justify-center mt-10">
                    {suggestions.length > 0 && (
                    <div className="w-full max-w-4xl space-y-4">
                        <p className="text-lg font-semibold text-blue-400 text-center">📚 Recommended Resources:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {suggestions.map((rec, i) => (
                            <div
                            key={i}
                            className="bg-white text-black rounded-xl shadow-lg p-4 border border-gray-200 flex flex-col items-center"
                            >
                            <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                                <img
                                src="/images/image4.png"
                                alt={rec.title}
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <a
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-center text-sm font-medium"
                            >
                                {rec.title}
                            </a>
                            <p className="text-xs text-gray-700 mt-1 text-center">
                                ({rec.type}, Cost: {rec.cost === 0 ? "Free" : `$${rec.cost}`})
                            </p>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </div>

                <DialogFooter className="mt-8">
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    )
}