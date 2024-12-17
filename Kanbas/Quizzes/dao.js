import Quiz from './model.js';

export const createQuiz = async (quizData) => {
  delete quizData._id
  return await Quiz.create(quizData);
};

export const findQuizzesByCourse = async (courseId) => {
  return await Quiz.find({ course: courseId });
};

export const findQuizById = async (quizId) => {
  return await Quiz.findById(quizId);
};

export const updateQuiz = async (quizId, quizData) => {
  return await Quiz.findByIdAndUpdate(quizId, quizData, { new: true });
};

export const deleteQuiz = async (quizId) => {
  return await Quiz.findByIdAndDelete(quizId);
};
