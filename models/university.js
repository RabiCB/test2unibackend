import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  ranking: Number,
  tuitionRange: [Number],
  acceptanceRate: Number,
  studentCount: Number,
  establishedYear: Number,
  description: String,
  programs: [String],
  applicationDeadline: String,
  requirements: {
    gpa: Number,
    sat: [Number],
    toefl: Number,
    ielts: Number,
  },
  website: String,
  bookmarked: { type: Boolean, default: false },
  images: [String],
});

export default mongoose.model("University", universitySchema);
