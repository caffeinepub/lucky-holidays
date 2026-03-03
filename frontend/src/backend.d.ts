import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Rating {
    id: bigint;
    stars: bigint;
    timestamp: Time;
    reviewer: Principal;
}
export type Time = bigint;
export interface Review {
    id: bigint;
    content: string;
    timestamp: Time;
    reviewer: Principal;
}
export interface backendInterface {
    getAllRatings(): Promise<Array<Rating>>;
    getAllReviews(): Promise<Array<Review>>;
    submitRating(stars: bigint): Promise<void>;
    submitReview(content: string): Promise<void>;
}
