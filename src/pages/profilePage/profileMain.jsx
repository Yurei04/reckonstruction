"use client"
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileMain() {
    const [userData, setUserData] = useState({
        name: "Aina Del Rosario",
        email: "aina.rosario@samplemail.com",
        password: "********",
        experience: "2 years in online content creation and freelance transcription.",
        disability: "Low vision and mild anxiety",
        wants: "A stable remote job with accessible tools and consistent workload.",
        circumstances: "Single parent living in low-income housing with limited mobility.",
        file: "aina_resume.pdf",
        profilePicture: "/profile-placeholder.jpg",
        capabilities: {
        literacyLevel: 8,
        visionAccessibility: 4,
        hearingAccessibility: 8,
        speechOrCommunication: 6,
        mobilityNeeds: 5,
        cognitiveSupport: 6,
        financialConstraints: 3,
        legalSocialObstacles: 7,
        caregivingResponsibilities: 4,
        digitalConfidence: 7,
        workEnvironmentPreference: 2,
        workScheduleFlexibility: 3,
        },
    });

    return (
        <div className="w-full min-h-screen pt-32 pb-6 flex flex-col items-center justify-center p-2">
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-between bg-amber-900/20 rounded-xl p-4 shadow-md">
                    <div className="flex flex-col">
                        <Avatar className="w-20 h-20 mb-4">
                            <AvatarImage src={userData.profilePicture} />
                            <AvatarFallback>{userData.name[0]}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-2xl font-bold text-amber-200">{userData.name}</h1>
                        <p className="text-sm text-amber-100">{userData.email}</p>
                        <p className="text-sm text-amber-100">Experience: {userData.experience}</p>
                        <p className="text-sm text-amber-100">Disability: {userData.disability}</p>
                        <p className="text-sm text-amber-100">Wants: {userData.wants}</p>
                        <p className="text-sm text-amber-100">Circumstances: {userData.circumstances}</p>
                    </div>
                    <div className=" flex flex-col border border-amber-600 items-center justify-center p-2 rounded-2xl">
                        <img
                        src="/images/qr.jpg"
                        alt="User QR Code"
                        className="w-36 h-36 rounded-md shadow"
                        />
                    </div>
                </div>
                

                <div className="grid lg:grid-cols-3 sm:grid-cols-1 grid-rows-auto gap-6">
                    {Object.entries(userData.capabilities).map(([key, value]) => (
                        <div
                        key={key}
                        className="bg-amber-800/20 p-4 rounded-xl shadow border border-amber-600"
                        >
                        <h2 className="text-lg font-semibold text-amber-100 capitalize">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                        </h2>
                        <p className="text-sm text-amber-200">Level: {value} / 10</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
