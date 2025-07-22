// src/Model/feedback.ts
export interface Feedback {
  id: string;
  overallRating: number;
  comment: string;
  courtQualityRating: number;
  cleanlinessRating: number;
  bookingExperienceRating: number;
  playedDate: string;
  account: {
    fullName: string;
  } | null;
}
