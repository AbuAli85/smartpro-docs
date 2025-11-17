import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search as SearchIcon, X, Clock, ArrowRight } from "lucide-react";
import { searchPages, addRecentSearch, getRecentSearches } from "@/lib/searchIndex";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchPages(query);
  const recentSearches = getRecentSearches();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSearch = (url: string, searchQuery: string) => {
    addRecentSearch(searchQuery);
    navigate(url);
    setIsOpen(false);
    setQuery("");
  };

  const handleRecentSearch = (recentQuery: string) => {
    setQuery(recentQuery);
    const result = searchPages(recentQuery)[0];
    if (result) {
      handleSearch(result.url, recentQuery);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm transition-colors"
        aria-label="Open search"
        title="Open search"
      >
        <SearchIcon className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden lg:inline-flex items-center gap-1 ml-auto text-xs bg-white px-2 py-1 rounded border border-slate-200">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile Search Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label="Open search"
        title="Open search"
      >
        <SearchIcon className="w-5 h-5 text-slate-600" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-x-0 top-0 z-50 pt-4 px-4 sm:pt-20">
            <div className="mx-auto max-w-2xl">
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
                  <SearchIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search pages, features, resources..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 outline-none text-base"
                  />
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    aria-label="Close search"
                    title="Close search"
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {query && results.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                      {results.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleSearch(result.url, query)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start justify-between group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-500 uppercase">
                                {result.category}
                              </span>
                            </div>
                            <p className="font-medium text-slate-900 truncate">
                              {result.title}
                            </p>
                            <p className="text-sm text-slate-600 line-clamp-1">
                              {result.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0 ml-2 mt-1" />
                        </button>
                      ))}
                    </div>
                  ) : query ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-slate-600">No results found for "{query}"</p>
                      <p className="text-sm text-slate-500 mt-1">Try different keywords</p>
                    </div>
                  ) : (
                    <div className="px-4 py-6">
                      {recentSearches.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase mb-3">
                            Recent Searches
                          </p>
                          <div className="space-y-2">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleRecentSearch(search)}
                                className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-600 hover:text-slate-900"
                              >
                                <Clock className="w-4 h-4 text-slate-400" />
                                <span>{search}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-xs">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-xs ml-2">
                      ⏎
                    </kbd>
                    <span>Select</span>
                    <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-xs ml-2">
                      esc
                    </kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
