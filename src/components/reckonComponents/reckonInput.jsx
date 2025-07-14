"use client";
import { Input } from "../ui/input";

export default function ReckonInput({ searchJob, set, placeholder = "Search..." }) {
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchJob}
        onChange={(e) => set(e.target.value)}
      />
    </div>
  );
}
