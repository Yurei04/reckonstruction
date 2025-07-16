"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Threads from "@/components/effects/threads";

const ITEMS_PER_PAGE = 9;

export default function LibrayMain() {
  const [libraryData, setLibraryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((result) => setLibraryData(result))
      .catch((error) =>
        console.error("Failed to load library database:", error)
      );
  }, []);

  useEffect(() => {
    let filtered = libraryData.filter((item) => {
      const resource = item.information;
      return (
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });

    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(
        (item) => item.information.type === selectedType
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedType, libraryData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="w-full p-10 items-center justify-center bg-black/40">
        <div  className="pointer-events-none fixed inset-0 z-[-1] ">
            <Threads
                amplitude={1}
                distance={1}
                enableMouseInteraction={false}
            />
        </div>
      <div className="flex gap-2 mb-4 mt-24">
        <Input
          placeholder="Search in Library..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-amber-300/20 border border-amber-300 cursor-pointer"
        />

        <Select
          onValueChange={(value) => setSelectedType(value)}
          value={selectedType || ""}
        >
          <SelectTrigger className="w-[200px] bg-amber-500/30 text-amber-900 border border-amber-100 cursor-pointer">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className="bg-amber-900/90 backdrop-blur-sm shadow-2xs text-amber-200 border cursor-pointer">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="Research">Research</SelectItem>
          </SelectContent>
        </Select>
      </div>


        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            {paginatedData.map((item, index) => {
                const resource = item?.information;
                if (!resource) return null;

                return (
                <div
                    key={index}
                    className="flex flex-row gap-4 bg-amber-200/10 text-amber-100 p-4 rounded-xl shadow-md backdrop-blur-md border border-white/10"
                >
                    <div>
                        <img 
                        src={resource.image} 
                        alt={resource.title} 
                        className="flex h-[100px] w-auto"
                        />
                    </div>    
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg mb-2">{resource.title || "N/A"}</div>
                        <div className="text-sm mb-1">
                        <span className="font-medium">Type:</span> {resource.type || "N/A"}
                        </div>
                        <div className="text-sm mb-1">
                        <span className="font-medium">Link:</span>{" "}
                        {resource.link ? (
                            <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                            >
                            Open Link
                            </a>
                        ) : (
                            "N/A"
                        )}
                        </div>
                        <div className="text-sm">
                        <span className="font-medium">Severity Match:</span>{" "}
                        {resource.severityMatch || "N/A"}
                        </div>
                    </div>
                </div>
                );
            })}
        </div>


      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6 ">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-amber-200/30 text-amber-200 border hover:border-amber-500 hover:bg-amber-900 hover:text-amber-200 transition-colors cursor-pointer"
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                className="bg-amber-200/30 text-amber-200 border hover:border-amber-500 hover:bg-amber-900 hover:text-amber-200 transition-colors cursor-pointer"
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-amber-200/30 text-amber-200 border hover:border-amber-500  hover:bg-amber-900 hover:text-amber-200 transition-colors cursor-pointer"
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
