import Link from "next/link";
import { Github, Mail, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-amber-900 text-amber-300 px-6 py-12 z-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="flex lg:flex-col sm:flex-col space-y-3 text-center md:text-left lg:items-start sm:items-center sm:justify-center">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
            ReckonStruction
          </h2>
          <p className="text-sm text-amber-400">
            ReckonStruction <br />
            Mollit exercitation excepteur aute laborum laborum est ipsum proident laborum aliqua.
          </p>
            <div className="flex justify-center md:justify-end gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Mail className="h-5 w-5 hover:text-amber-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 hover:text-amber-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-amber-500" />
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-amber-500" />
            </a>
            </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 text-sm">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/" className="hover:text-amber-500 transition-colors">Reckon</Link>
          <Link href="/" className="hover:text-amber-500 transition-colors">Construct</Link>
          <Link href="/" className="hover:text-amber-500 transition-colors">Profile</Link>
        </div>

        <div className="space-y-4 text-center md:text-right flex flex-col">
          <div>
            <p className="text-sm text-amber-400">Want updates?</p>
            <form className="mt-2 flex flex-col sm:flex-row gap-2 items-center justify-center md:justify-end">
              <input
                type="email"
                placeholder="you@example.com"
                className="px-3 py-2 rounded-lg bg-black border border-amber-700 text-sm text-amber-200 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-lg transition-colors"
              >
                Message Us
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-amber-500">
        © {new Date().getFullYear()} ReckonStruction. All rights reserved.
      </div>
    </footer>
  );
}
