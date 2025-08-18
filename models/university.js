
import mongoose from "mongoose";

const requirementsSchema = new mongoose.Schema({
  gpa: { type: Number, required: true },
  sat: { type: [Number], required: true }, // [min, max]
  toefl: { type: Number, required: true },
  ielts: { type: Number, required: true },
});

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    ranking: { type: Number, required: true },
    tuitionRange: { type: [Number], required: true }, 
    acceptanceRate: { type: Number }, 
    studentCount: { type: Number, required: true },
    establishedYear: { type: Number, required: true },
    description: { type: String, required: true },
    programs: [{ type: String, required: true }],
    applicationDeadline: { type: Date, required: true },
    requirements: { type: requirementsSchema, required: true },
    website: { type: String, required: true },
    bookmarked: { type: Boolean, default: false },
    images: [{ type: String, required: true }], 
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
