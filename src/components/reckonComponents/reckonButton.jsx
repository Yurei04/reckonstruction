"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReckonInput from "./reckonInput";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";

export default function ReckonButton({ label }) {
    const [jobDatabase, setJobDatabase] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [searchJob, setSearchJob] = useState("");

    useEffect(() => {
        fetch("/data/jobsData.json")
        .then((res) => res.json())
        .then((data) => setJobDatabase(data))
        .catch((error) => console.log("Database Loading Error:", error));

        etch("/data/profile.json")
        .then((res) => res.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.log("Database Loading Error:", error));
    }, []);

    function searchCheck() {
        if (!jobDatabase.length || !profileData.length) return;

        if (searchJob.trim() === "") {
        alert("Please Input a Job");
        return;
        }

        const searchTerms = searchJob.toLowerCase().split(" ");
        console.log("Search terms:", searchTerms);
       
    }

    return (
        <div className="w-full flex gap-2">
            <ReckonInput 
            searchJob={searchJob} 
            set={setSearchJob} 
            />
            <Button 
            onClick={searchCheck}>
                {label}
            </Button>

            {searchJob.map((job, index) => (
                <Dialog key={index}>
                <DialogHeader>
                    <DialogTitle>

                    </DialogTitle>
                </DialogHeader>
                <DialogContent className="flex flex-col">
                    <div className="">

                    </div>
                    <div className="">

                    </div>
                    <div className="">

                    </div>
                </DialogContent>
                <DialogFooter>

                </DialogFooter>
            </Dialog>
            ))}
        </div>
    );
}
