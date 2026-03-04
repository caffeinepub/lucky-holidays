import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import {
  useAllRatings,
  useAllReviews,
  useSubmitRating,
  useSubmitReview,
} from "../hooks/useQueries";

export default function Ratings() {
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoverStars, setHoverStars] = useState(0);

  const { data: ratings = [], isLoading: ratingsLoading } = useAllRatings();
  const { data: reviews = [], isLoading: reviewsLoading } = useAllReviews();
  const submitRating = useSubmitRating();
  const submitReview = useSubmitReview();

  const totalRatings = ratings.length;
  const avgRating =
    totalRatings > 0
      ? ratings.reduce((sum, r) => sum + Number(r.stars), 0) / totalRatings
      : 0;

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratings.filter((r) => Number(r.stars) === star).length,
  }));

  const handleSubmitRating = async () => {
    if (selectedStars === 0) return;
    await submitRating.mutateAsync(selectedStars);
    setSelectedStars(0);
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;
    await submitReview.mutateAsync(reviewText.trim());
    setReviewText("");
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-3">
          Customer Ratings & Reviews
        </h1>
        <p className="text-muted-foreground text-lg">
          See what our travelers say about LAKKI HOLIDAYS
        </p>
      </div>

      {/* Overall Rating */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center">
          <div className="font-display text-7xl font-bold text-primary">
            {avgRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={24}
                className={
                  s <= Math.round(avgRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            ))}
          </div>
          <div className="text-muted-foreground text-sm">
            {totalRatings} rating{totalRatings !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Star Breakdown */}
        <div className="flex-1 w-full">
          {ratingsLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 size={24} className="animate-spin text-primary" />
            </div>
          ) : (
            starCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3 mb-2">
                <span className="text-sm w-4 text-right">{star}</span>
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{
                      width:
                        totalRatings > 0
                          ? `${(count / totalRatings) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-6">
                  {count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submit Rating */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h2 className="font-display text-xl font-semibold mb-4">
          Rate Your Experience
        </h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSelectedStars(s)}
              onMouseEnter={() => setHoverStars(s)}
              onMouseLeave={() => setHoverStars(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={32}
                className={
                  s <= (hoverStars || selectedStars)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmitRating}
          disabled={selectedStars === 0 || submitRating.isPending}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {submitRating.isPending && (
            <Loader2 size={16} className="animate-spin" />
          )}
          Submit Rating
        </button>
      </div>

      {/* Submit Review */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-10">
        <h2 className="font-display text-xl font-semibold mb-4">
          Write a Review
        </h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your travel experience with LAKKI HOLIDAYS..."
          className="w-full border border-border rounded-xl p-4 text-sm bg-background resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
        />
        <button
          type="button"
          onClick={handleSubmitReview}
          disabled={!reviewText.trim() || submitReview.isPending}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {submitReview.isPending && (
            <Loader2 size={16} className="animate-spin" />
          )}
          Submit Review
        </button>
      </div>

      {/* Reviews List */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-6">
          Customer Reviews
        </h2>
        {reviewsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-5xl mb-3">💬</div>
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={String(review.id)}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {review.reviewer.toString().slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {review.reviewer.toString().slice(0, 12)}...
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(review.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
