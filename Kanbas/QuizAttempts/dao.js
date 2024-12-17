import Attempt from './model.js';
import Quiz from '../Quizzes/model.js';
import * as userDao from "../Users/dao.js";

const calculateScore = (quiz, userAnswers) => {
  let score = 0;
  const questionsMap = {};

  quiz.questions.forEach((q) => {
    questionsMap[q._id.toString()] = q;
  });

  userAnswers.forEach((userAns) => {
    const question = questionsMap[userAns.questionId];
    if (!question) return;

    let correct = false;
    switch (question.type) {
      case 'multipleChoice':
        const correctChoice = question.choices.find(ch => ch.isCorrect);
        if (correctChoice && userAns.answer === correctChoice.text) {
          correct = true;
        }
        break;
      case 'trueFalse':
        const userBool = (userAns.answer.toString().toLowerCase() === 'true');
        if (userBool === question.isTrue) {
          correct = true;
        }
        break;
      case 'fillInBlanks':
        if (question.correctAnswers.includes(userAns.answer)) {
          correct = true;
        }
        break;
    }

    if (correct) {
      score += question.points;
    }
  });

  return score;
};

export const createOrUpdateAttempt = async (userId, quizId, answers) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }

  // Fetch the current attempt if any
  const existingAttempt = await Attempt.findOne({ userId, quizId });
  let attemptCount = 1;

  if (existingAttempt) {
    attemptCount = existingAttempt.attemptCount + 1;
  }

  const user = await userDao.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is allowed to attempt again
  if (user.role !== 'FACULTY' && attemptCount > quiz.allowedAttempts) {
    // User has exceeded the allowed attempts
    const error = new Error(`No more attempts allowed. You have reached the maximum of ${quiz.allowedAttempts} attempt(s).`);
    error.name = 'MaxAttemptsExceededError';
    throw error;
  }
  
  const score = calculateScore(quiz, answers);

  return await Attempt.findOneAndUpdate(
    { userId, quizId },
    { userId, quizId, answers, score, timestamp: new Date(), attemptCount },
    { new: true, upsert: true }
  );
};

export const findAttemptByUserAndQuiz = async (userId, quizId) => {
  return await Attempt.findOne({ userId, quizId });
};

export const findAttemptScore = async (userId, quizId) => {
  const attempt = await Attempt.findOne({ userId, quizId });
  if (!attempt) {
    throw new Error('Attempt not found');
  }
  return attempt.score;
};
