"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import BlogCard from "@/components/ui/cards/BlogCard";
import Image from "next/image";
import { BookOpen, ChevronDown, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getAllBlogPosts, getAllBlogCategories, BlogCategoryResponse } from "@/lib/api/blog";
import { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        const data = await getAllBlogPosts();
        // Transform backend data to frontend format
        const transformedPosts: BlogPost[] = data.map((post) => ({
          ...post,
          category: post.category || "Uncategorized", // Use actual category or default
          views: post.views || 0,
          likes: post.likes || 0,
          tags: post.tags || [],
        }));
        setBlogPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllBlogCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching blog categories:", err);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filteredBlogs = useMemo(() => {
    if (selectedCategory === "All") {
      return blogPosts;
    }
    return blogPosts.filter((blog) => blog.category === selectedCategory);
  }, [selectedCategory, blogPosts]);

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(POSTS_PER_PAGE);
  }, [selectedCategory]);

  const displayedBlogs = filteredBlogs.slice(0, displayCount);
  const hasMore = filteredBlogs.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="TEDxMaitama Blog"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <Container className="relative z-10 text-center text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-tedx-red" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our <span className="text-tedx-red">Blog</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-2">
              Discover stories, insights, and ideas worth spreading from the TEDxMaitama community.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  Latest <span className="text-tedx-red">Posts</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Explore our collection of articles and stories
                </p>
              </div>
              
              {/* Category Filter Dropdown */}
              <div className="relative w-full md:w-auto" ref={dropdownRef}>
                
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-tedx-red transition-colors w-full md:min-w-[180px] justify-between"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {selectedCategory}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 md:right-0 mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden max-h-[300px] overflow-y-auto"
                  >
                    {/* "All" option */}
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedCategory === "All"
                          ? "bg-tedx-red text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      All
                    </button>
                    {/* Category options from API */}
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedCategory === category.name
                            ? "bg-tedx-red text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No blog posts found in this category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {displayedBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mt-12"
                >
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    size="lg"
                    className="border-2 border-tedx-red text-tedx-red hover:bg-tedx-red hover:text-white"
                  >
                    Load More Posts
                    <ArrowDown className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </Container>
      </section>
    </Layout>
  );
}

