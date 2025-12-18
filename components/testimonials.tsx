"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Review {
  id: string;
  reviewerName: string;
  starRating: number;
  comment: string;
  source: number;
  dateAdded: string;
  iconUrl: string;
}

interface ApiResponse {
  reviews: Review[];
  // Add other fields if needed, e.g. total, page
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LOCATION_ID = "3IKPu1rkdPvYETWI7O4B";
  const WIDGET_ID = "68fba2b012758db5ebf53820";
  const PAGE_SIZE = 3; // Requesting 3 items per page

  const fetchReviews = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://services.leadconnectorhq.com/reputation/widgets/data?locationId=${LOCATION_ID}&widgetId=${WIDGET_ID}&status=live&projection=reviews&page=${pageNumber}&size=${PAGE_SIZE}`
      );
      const data: ApiResponse = await res.json();

      if (data.reviews && data.reviews.length > 0) {
        setReviews(prev => [...prev, ...data.reviews]);
        if (data.reviews.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage);
  };

  return (
    <section className="py-20 bg-background text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase opacity-90 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Testimonials
          </h2>
          <div className="w-20 h-[1px] bg-primary mx-auto mt-6 opacity-60" />
        </div>

        {/* Reviews Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 break-inside-avoid hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder / Initial */}
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <svg
                      className="size-6 text-primary/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-white text-lg">
                      {review.reviewerName}
                    </h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`size-3 ${i < review.starRating ? "text-[#C5A059]" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Source Icon (Google) */}
                {review.iconUrl && (
                  <div className="opacity-70 grayscale hover:grayscale-0 transition-all">
                    <Image
                      src={review.iconUrl}
                      alt="Source"
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </div>

              <div className="relative">
                <input type="checkbox" id={`expand-${review.id}`} className="peer hidden" />
                <div className="text-white/70 font-light leading-relaxed text-sm">
                  <span className="peer-checked:hidden">
                    "{review.comment.length > 200 ? `${review.comment.substring(0, 200)}...` : review.comment}"
                  </span>
                  <span className="hidden peer-checked:inline">
                    "{review.comment}"
                  </span>
                </div>
                {review.comment.length > 200 && (
                  <label
                    htmlFor={`expand-${review.id}`}
                    className="mt-6 text-xs text-white uppercase tracking-widest cursor-pointer"
                  >
                    Read More
                  </label>
                )}
              </div>

              <div className="mt-6 text-xs text-white uppercase tracking-widest">
                {new Date(review.dateAdded).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-16 text-center flex justify-center">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="hidden md:flex border border-primary/50 text-white bg-primary/10 backdrop-blur-sm hover:bg-primary hover:text-black hover:border-primary rounded-xl px-8 py-6 tracking-widest text-xs uppercase font-medium transition-all duration-300"
            >
              {loading ? "Loading..." : "Load More Reviews"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
