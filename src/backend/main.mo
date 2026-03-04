import MixinStorage "blob-storage/Mixin";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  include MixinStorage();

  type Review = {
    id : Nat;
    reviewer : Principal.Principal;
    timestamp : Time.Time;
    content : Text;
  };

  module Review {
    public func compare(review1 : Review, review2 : Review) : Order.Order {
      Text.compare(review1.content, review2.content);
    };
  };

  type Rating = {
    id : Nat;
    reviewer : Principal.Principal;
    timestamp : Time.Time;
    stars : Nat;
  };

  module Rating {
    public func compareByStars(rating1 : Rating, rating2 : Rating) : Order.Order {
      Nat.compare(rating1.stars, rating2.stars);
    };
  };

  let reviews = Map.empty<Nat, Review>();
  let ratings = Map.empty<Nat, Rating>();
  var nextReviewId = 0;
  var nextRatingId = 0;

  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray().sort();
  };

  public query ({ caller }) func getAllRatings() : async [Rating] {
    ratings.values().toArray().sort(Rating.compareByStars);
  };

  public shared ({ caller }) func submitReview(content : Text) : async () {
    if (content.isEmpty()) {
      Runtime.trap("Review content cannot be empty");
    };

    let review : Review = {
      id = nextReviewId;
      reviewer = caller;
      timestamp = Time.now();
      content;
    };

    reviews.add(nextReviewId, review);
    nextReviewId += 1;
  };

  public shared ({ caller }) func submitRating(stars : Nat) : async () {
    if (stars < 1 or stars > 5) {
      Runtime.trap("Rating must be between 1 and 5 stars");
    };

    let rating : Rating = {
      id = nextRatingId;
      reviewer = caller;
      timestamp = Time.now();
      stars;
    };

    ratings.add(nextRatingId, rating);
    nextRatingId += 1;
  };
};
