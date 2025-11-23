"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Tag,
  Copy,
} from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/ui/cards/BlogCard";
import ReadingProgressBar from "@/components/ui/ReadingProgressBar";
import StickyShareButtons from "@/components/ui/StickyShareButtons";
import FloatingLikeButton from "@/components/ui/FloatingLikeButton";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TableOfContents from "@/components/ui/TableOfContents";
import { Eye, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogPostById, getAllBlogPosts, incrementBlogViews, incrementBlogLikes } from "@/lib/api/blog";
import { BlogPost } from "@/types/blog";

export default function BlogPostPage() {
  const params = useParams();
  const blogId = params?.id as string;
  const currentBlogId = parseInt(blogId);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogData() {
      try {
        setLoading(true);
        const [blogData, allBlogsData] = await Promise.all([
          getBlogPostById(currentBlogId),
          getAllBlogPosts()
        ]);
        
        // Use actual category from API, fallback to "Community" if not available
        const transformedBlog: BlogPost = {
          ...blogData,
          category: blogData.category || "Community",
          views: blogData.views || 0,
          likes: blogData.likes || 0,
          tags: blogData.tags || [],
        };
        
        const transformedBlogs: BlogPost[] = allBlogsData.map((post) => ({
          ...post,
          category: post.category || "Community",
          views: post.views || 0,
          likes: post.likes || 0,
          tags: post.tags || [],
        }));
        
        setBlog(transformedBlog);
        setAllBlogs(transformedBlogs);
        setError(null);
        
        // Increment views when blog post is loaded
        await incrementBlogViews(currentBlogId);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    if (currentBlogId) {
      fetchBlogData();
    }
  }, [currentBlogId]);

  // Get next and previous posts
  const currentIndex = allBlogs.findIndex((b) => b.id === currentBlogId);
  const nextPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  // Get related posts (same category, excluding current post)
  const relatedPosts = useMemo(() => {
    if (!blog) return [];
    return allBlogs
      .filter((b) => b.category === blog.category && b.id !== blog.id)
      .slice(0, 3);
  }, [blog, allBlogs]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  // Social sharing functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = blog ? `${blog.title} - TEDxMaitama` : "";

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      "_blank"
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Process content to add IDs to headings for TOC
  const [processedContent, setProcessedContent] = useState(blog?.content || "");
  
  // Like functionality
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes || 0);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (blog) {
      // Initialize like count from blog data
      setLikeCount(blog.likes || 0);
      // Initialize isLiked as false (user hasn't liked yet in this session)
      setIsLiked(false);

      // Process content
      const parser = new DOMParser();
      const doc = parser.parseFromString(blog.content, "text/html");
      const headings = doc.querySelectorAll("h2, h3");
      
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
      
      setProcessedContent(doc.body.innerHTML);
    }
  }, [blog]);

  const handleLike = async () => {
    if (!blog || liking || isLiked) return;
    
    try {
      setLiking(true);
      const result = await incrementBlogLikes(blog.id);
      
      if (result.success) {
        // Update like count from API response
        setLikeCount(result.likes);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error liking blog post:", error);
      // Optionally show error message to user
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-20 text-center">
          <p className="text-gray-600">Loading blog post...</p>
        </Container>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <Container className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </Container>
      </Layout>
    );
  }

  const shareUrlFull = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Layout>
      <ReadingProgressBar />
      {blog && <StickyShareButtons url={shareUrlFull} title={blog.title} />}
      
      {/* Hero Image */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={`/images/banner.jpg`}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-white"
          >
            {/* <Link href="/blog">
              <Button
                variant="outline"
                className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link> */}
            {blog.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-tedx-red/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  <Tag className="w-3 h-3" />
                  {blog.category}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.date_created)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{calculateReadingTime(blog.content)} min read</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: blog.category || "Uncategorized", href: `/blog?category=${blog.category || "Uncategorized"}` },
                { label: blog.title },
              ]}
            />

            {/* Post Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              {blog.views && (
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views.toLocaleString()} views</span>
                </div>
              )}
              
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-tedx-red text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-label={isLiked ? "Unlike this post" : "Like this post"}
              >
                <motion.div
                  animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  strokeWidth={isLiked ? 0 : 2}
                  fill={isLiked ? "currentColor" : "none"}
                  style={{ transition: "all 0.3s" }}
                  />
                </motion.div>
                <span className="font-semibold">{likeCount}</span>
                <span className="text-sm">{likeCount === 1 ? "like" : "likes"}</span>
              </button>
            </motion.div>

            {/* Tags */}
            
            {/* Social Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 pb-8 border-b border-gray-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {blog.tags && blog.tags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {blog.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-tedx-red hover:text-white text-gray-700 rounded-full text-sm transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </motion.div>
                  )}

                </div>
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-700">Share this post:</span>
                  <button
                    onClick={shareToTwitter}
                    className="cursor-pointer p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareToFacebook}
                    className="cursor-pointer p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="cursor-pointer p-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={shareToWhatsApp}
                    className="cursor-pointer p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="cursor-pointer px-3 py-2 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    aria-label="Copy link"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Table of Contents - Mobile (before content) */}
            <div className="lg:hidden mb-8">
              <TableOfContents content={blog.content} />
            </div>

            {/* Article Content with Table of Contents and Like Button */}
            <div className="grid lg:grid-cols-[250px_1fr_80px] gap-8">
              {/* Table of Contents - Desktop (left sidebar) */}
              <div className="hidden lg:block">
                <TableOfContents content={blog.content} />
              </div>

              {/* Article Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg max-w-none prose-headings:text-tedx-black prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24 prose-a:text-tedx-red prose-a:no-underline hover:prose-a:underline prose-strong:text-tedx-black prose-strong:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2"
              >
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </motion.article>

              {/* Floating Like Button - Desktop (right sidebar) */}
              <div className="hidden lg:block">
                <FloatingLikeButton
                  blogId={blog.id}
                  onLike={handleLike}
                  isLiked={isLiked}
                  likeCount={likeCount}
                />
              </div>
            </div>

            {/* Author Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-tedx-red flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-tedx-black mb-1">{blog.author}</h3>
                  <p className="text-gray-600">
                    Contributing writer at TEDxMaitama, sharing stories and insights from our community.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next/Previous Navigation */}
            {(nextPost || prevPost) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {prevPost && (
                    <Link href={`/blog/${prevPost.id}`}>
                      <div className="group p-6 border-2 border-gray-200 rounded-xl hover:border-tedx-red transition-colors">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <ArrowLeft className="w-4 h-4" />
                          <span>Previous Post</span>
                        </div>
                        <h4 className="font-bold text-lg text-tedx-black group-hover:text-tedx-red transition-colors line-clamp-2">
                          {prevPost.title}
                        </h4>
                      </div>
                    </Link>
                  )}
                  {nextPost && (
                    <Link href={`/blog/${nextPost.id}`} className={!prevPost ? "md:col-start-2" : ""}>
                      <div className="group p-6 border-2 border-gray-200 rounded-xl hover:border-tedx-red transition-colors text-right md:text-left">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 justify-end md:justify-start">
                          <span>Next Post</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-lg text-tedx-black group-hover:text-tedx-red transition-colors line-clamp-2">
                          {nextPost.title}
                        </h4>
                      </div>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

            {/* Back to Blog Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to All Posts
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related <span className="text-tedx-red">Posts</span>
              </h2>
              <p className="text-gray-600">
                More stories from the {blog.category || "Uncategorized"} category
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard blog={relatedPost} />
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </Layout>
  );
}

