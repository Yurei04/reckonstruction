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

import ConstructButton from "./contructButton";

export default function ReckonButton({ label }) {
  const [jobDatabase, setJobDatabase] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [searchJob, setSearchJob] = useState("");
  const [chosenJob, setChosenJob] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("/data/jobsData.json")
      .then((res) => res.json())
      .then((result) => {
        setJobDatabase(result);
      })
      .catch((error) => console.error("Failed to load job database:", error));
  }, []);

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfileData(data))
      .catch((error) => console.log("Profile DB Error:", error));
  }, []);

function searchCheck() {
  console.log("check1")
  if (!jobDatabase.length) return;

  if (searchJob.trim() === "") {
    alert("Please input a job.");
    return;
  }

  const matchedJob = jobDatabase.find(
    (job) => job.job.toLowerCase() === searchJob.toLowerCase()
  );

  if (matchedJob) {
    setChosenJob(matchedJob);
    setOpenDialog(true);
    return;
  }

  const partialMatches = jobDatabase
    .filter((job) =>
      job.job.toLowerCase().includes(searchJob.toLowerCase())
    )
    .slice(0, 3); 
  if (partialMatches.length > 0) {
    setChosenJob({
      job: "No exact match found",
      type: "Suggestions",
      des: "Here are similar jobs you may want to consider:",
      suggestions: partialMatches,
    });
    setOpenDialog(true);
  } else {
    alert("No matching jobs found. Try a broader keyword.");
  }
}


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
    <div className="w-full relative text-amber-100">
      <div className="w-full flex flex-row gap-5">
        <ReckonInput
          searchJob={searchJob}
          set={setSearchJob}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />

        <div className="cursor-pointer">
          <Button className="cursor-pointer" onClick={() => searchCheck()}>
            {label}
          </Button>
        </div>
        
      </div>

      {showSuggestions && searchJob && (
        <div className="absolute z-10 bg-black border w-full mt-1 rounded-lg shadow">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((job, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  setSearchJob(job.job);
                  setShowSuggestions(false);
                  setChosenJob(job); 
                  setOpenDialog(true);
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

      {chosenJob && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="w-1/2 h-screen max-w-none rounded-none p-6 bg-black/90 text-amber-100 overflow-auto">
            <DialogHeader>
              <DialogTitle>{chosenJob.job}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 text-white">
              {chosenJob.suggestions ? (
                <>
                  <p className="text-lg">{chosenJob.des}</p>
                  <ul className="list-disc pl-5">
                    {chosenJob.suggestions.map((sug, i) => (
                      <li key={i}>
                        <strong>{sug.job}</strong> — {sug.des}
                        <Button
                          className="ml-2"
                          onClick={() => {
                            setChosenJob(sug);
                          }}
                        >
                          View
                        </Button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    <strong>Type:</strong> {chosenJob.type}
                  </p>
                  <p>
                    <strong>Description:</strong> {chosenJob.des}
                  </p>
                  <p>
                    <strong>Salary Range:</strong>{" "}
                    {chosenJob.salaryRange?.min} - {chosenJob.salaryRange?.max}{" "}
                    {chosenJob.salaryRange?.currency}
                  </p>
                  <p>
                    <strong>Key Software:</strong>{" "}
                    {chosenJob.skills?.software?.join(", ")}
                  </p>
                  <p>
                    <strong>Soft Skills:</strong>{" "}
                    {chosenJob.skills?.softSkills?.join(", ")}
                  </p>
                  <p>
                    <strong>Unfit for:</strong> {chosenJob.unfit?.join(", ")}
                  </p>
                  <p>
                    <strong>Accessible Alternatives:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {chosenJob.accessibleAlternatives?.map((alt, idx) => (
                      <li key={idx}>
                        <strong>{alt.job}</strong>: {alt.why}
                      </li>
                    ))}
                  </ul>
                  <p>
                    <strong>Recommendations:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {chosenJob.recommendations?.map((rec, idx) => (
                      <li key={idx}>
                        [{rec.type}]{" "}
                        <a
                          href={rec.url}
                          className="text-blue-400 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rec.title}
                        </a>{" "}
                        – ${rec.cost}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <DialogFooter>
              <div className="cursor-pointer">
                <ConstructButton
                  label="Analyze"
                  searchValue={searchJob}
                  clearSearch={() => setSearchJob("")}
                  database={jobDatabase}
                />
              </div>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
