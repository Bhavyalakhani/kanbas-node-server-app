import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['multipleChoice', 'trueFalse', 'fillInBlanks'],
      required: true
    },
    title: { type: String, required: true },
    points: { type: Number, required: true },
    questionText: { type: String, required: true },
    
    choices: [
      {
        text: String,
        isCorrect: Boolean
      }
    ],  // For multipleChoice type
    isTrue: Boolean,  // For trueFalse type
    correctAnswers: [String]  // For fillInBlanks type
  });
  

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    quizType: { type: String, default: 'Graded Quiz' },
    points: { type: String, default: 100 },
    assignmentGroup: { type: String, default: 'Quizzes' },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: String, default: 20 },
    allowedAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: {type: Boolean, default: false},
    questions: [questionSchema]
},
{ collection: "quizzes" }
);

export default quizSchema;
