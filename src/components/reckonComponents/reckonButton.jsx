"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ReckonInput from "./reckonInput";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

export default function ReckonButton({ label }) {
  const [jobDatabase, setJobDatabase] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("/data/jobsData.json")
      .then((res) => res.json())
      .then((data) => setJobDatabase(data))
      .catch((error) => console.log("Job DB Error:", error));

    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.log("Profile DB Error:", error));
  }, []);

  function searchCheck() {
    if (!jobDatabase.length || !profileData.length) return;

    if (searchJob.trim() === "") {
      alert("Please Input a Job");
      return;
    }

    const searchTerms = searchJob.toLowerCase().split(" ");
    console.log("Search terms:", searchTerms);
    // your matching logic here
  }

  // Filter and highlight suggestions
  const filteredSuggestions = jobDatabase.filter((job) =>
    job.job.toLowerCase().includes(searchJob.toLowerCase())
  );

  function highlightMatch(text, query) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <span className="font-bold text-blue-600">{match}</span>
        {after}
      </>
    );
  }

  return (
    <div className="w-full max-w-md relative">
      <ReckonInput
        searchJob={searchJob}
        set={setSearchJob}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />

      {showSuggestions && searchJob && (
        <div className="absolute z-10 bg-white border w-full mt-1 rounded-lg shadow">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((job, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-blue-100"
                onClick={() => {
                  setSearchJob(job.job);
                  setShowSuggestions(false);
                }}
              >
                {highlightMatch(job.job, searchJob)}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No matches found</div>
          )}
        </div>
      )}

      <div className="mt-3">
        <Button onClick={searchCheck}>{label}</Button>
      </div>
    </div>
  );
}
