import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  answer: { type: String, required: true }
});

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: { type: [answerSchema], default: [] },
  score: { type: Number, default: 0 },
  attemptCount: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now }
}, 
{ collection: 'attempts' }
);

export default attemptSchema;