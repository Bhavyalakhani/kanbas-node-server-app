import mongoose from "mongoose";

const asignmentsSchema = new mongoose.Schema(
 {
   title: String,
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
   points: Number,
   dueDate: { type: Date, default: Date.now},
   availableDate: { type: Date, default: Date.now},
 },
 { collection: "assignments" }
);
export default asignmentsSchema;