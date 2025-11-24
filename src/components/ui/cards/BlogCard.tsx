import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { createSlug } from "@/utils/slug";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  const slug = createSlug(blog.title || `blog-${blog.id}`);

  return (
    <Link href={`/blog/${blog.id}/${slug}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-200">
          <Image
            src={`/images/banner.jpg`}
            alt={blog.title}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{blog.date_created ? formatDate(blog.date_created) : "Date coming soon"}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-tedx-black mb-3 line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
            {truncateContent(blog.content)}
          </p>

          <div className="flex items-center text-tedx-red font-semibold group">
            Read more
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

