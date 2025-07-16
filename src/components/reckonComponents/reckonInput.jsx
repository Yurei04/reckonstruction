"use client";
import { Input } from "../ui/input";

export default function ReckonInput({ searchJob, set, ...props }) {
  return (
    <Input
      type="text"
      className="w-full border border-amber-300 px-4 py-2 rounded-lg focus:outline-none"
      value={searchJob}
      onChange={(e) => set(e.target.value)}
      placeholder="Search job title..."
      {...props}
    />
  );
}
