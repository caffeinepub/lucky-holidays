import { useState } from 'react';
import { Star, Send, MessageSquare, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useGetAllRatings, useGetAllReviews, useSubmitRating, useSubmitReview } from '@/hooks/useQueries';
import type { Rating, Review } from '../backend';

function StarRating({ value, onChange, size = 28 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= (hovered || value)
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted-foreground/40'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getAverageRating(ratings: Rating[]): number {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, r) => sum + Number(r.stars), 0);
  return total / ratings.length;
}

export default function Ratings() {
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { data: ratings = [], isLoading: ratingsLoading } = useGetAllRatings();
  const { data: reviews = [], isLoading: reviewsLoading } = useGetAllReviews();
  const submitRatingMutation = useSubmitRating();
  const submitReviewMutation = useSubmitReview();

  const avgRating = getAverageRating(ratings);
  const isSubmitting = submitRatingMutation.isPending || submitReviewMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    if (selectedStars === 0) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!reviewText.trim()) {
      setFormError('Please write a review before submitting.');
      return;
    }

    try {
      await submitRatingMutation.mutateAsync(selectedStars);
      await submitReviewMutation.mutateAsync(reviewText.trim());
      setSuccessMsg('Thank you for your review! It has been submitted successfully.');
      setSelectedStars(0);
      setReviewText('');
    } catch {
      setFormError('Failed to submit your review. Please try again.');
    }
  };

  const isLoading = ratingsLoading || reviewsLoading;

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-primary mb-4">
            Ratings & Reviews
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Hear from our happy travelers and share your own experience with LUCKY HOLIDAYS.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Summary + Form */}
            <div className="lg:col-span-1 space-y-6">
              {/* Overall Rating */}
              <Card className="border-border shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp size={20} className="text-primary" />
                    <h2 className="font-display font-semibold text-lg text-foreground">Overall Rating</h2>
                  </div>
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 size={32} className="animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="font-display font-bold text-6xl text-primary my-3">
                        {avgRating > 0 ? avgRating.toFixed(1) : '—'}
                      </div>
                      <div className="flex justify-center mb-2">
                        <StarRating value={Math.round(avgRating)} size={22} />
                      </div>
                      <p className="text-sm text-muted-foreground font-body">
                        Based on {ratings.length} rating{ratings.length !== 1 ? 's' : ''}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Rating Distribution */}
              {!isLoading && ratings.length > 0 && (
                <Card className="border-border shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-display font-semibold text-base text-foreground mb-4">Rating Breakdown</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratings.filter((r) => Number(r.stars) === star).length;
                        const pct = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 text-sm font-body">
                            <span className="w-4 text-muted-foreground text-right">{star}</span>
                            <Star size={12} className="fill-primary text-primary flex-shrink-0" />
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-6 text-muted-foreground text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Submit Form */}
              <Card className="border-border shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare size={18} className="text-primary" />
                    <h2 className="font-display font-semibold text-lg text-foreground">Write a Review</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <p className="text-sm font-body text-muted-foreground mb-2">Your Rating *</p>
                      <StarRating value={selectedStars} onChange={setSelectedStars} size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-body text-muted-foreground mb-2">Your Review *</p>
                      <Textarea
                        value={reviewText}
                        onChange={(e) => {
                          setReviewText(e.target.value);
                          setFormError('');
                        }}
                        placeholder="Share your travel experience with LUCKY HOLIDAYS..."
                        rows={4}
                        className="font-body resize-none"
                        disabled={isSubmitting}
                      />
                    </div>
                    {formError && (
                      <p className="text-destructive text-sm font-body">{formError}</p>
                    )}
                    {successMsg && (
                      <p className="text-primary text-sm font-body font-medium">{successMsg}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold rounded-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Reviews List */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Customer Reviews
                {reviews.length > 0 && (
                  <span className="text-base font-body font-normal text-muted-foreground ml-2">
                    ({reviews.length})
                  </span>
                )}
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader2 size={40} className="animate-spin text-primary" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-2xl border border-border">
                  <MessageSquare size={48} className="text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Be the first to share your experience with LUCKY HOLIDAYS!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...reviews].reverse().map((review: Review) => {
                    const matchingRating = ratings.find(
                      (r) => r.reviewer.toString() === review.reviewer.toString()
                    );
                    const stars = matchingRating ? Number(matchingRating.stars) : 0;

                    return (
                      <Card key={review.id.toString()} className="border-border shadow-card hover:shadow-card-hover transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="font-display font-bold text-primary text-sm">
                                  {review.reviewer.toString().slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-body font-semibold text-sm text-foreground">
                                  Traveler
                                </p>
                                <p className="text-xs text-muted-foreground font-body">
                                  {formatDate(review.timestamp)}
                                </p>
                              </div>
                            </div>
                            {stars > 0 && <StarRating value={stars} size={16} />}
                          </div>
                          <p className="text-sm text-muted-foreground font-body leading-relaxed">
                            {review.content}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
