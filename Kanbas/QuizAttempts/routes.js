import { createOrUpdateAttempt, findAttemptByUserAndQuiz, findAttemptScore } from './dao.js';

export default function AttemptsRoutes(app) {
  // POST /api/attempts
  // Request body: { userId: string, quizId: string, answers: [{questionId, answer}] }
  app.post('/api/attempts', async (req, res) => {
    const { userId, quizId, answers } = req.body;
    console.log("Attempt request body" + JSON.stringify(req.body));
    if (!userId || !quizId || !answers) {
      return res.status(400).json({ error: 'Missing userId, quizId, or answers' });
    }

    try {
      const attempt = await createOrUpdateAttempt(userId, quizId, answers);
      res.status(200).json(attempt);
    } catch (error) {
      console.error('Error creating/updating attempt:', error);
      if (error.name === 'MaxAttemptsExceededError') {
        return res.status(403).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to process attempt' });
    }
  });

  // GET /api/attempts/:userId/:quizId
  // Returns the latest attempt for that user and quiz
  app.get('/api/attempts/:userId/:quizId', async (req, res) => {
    const { userId, quizId } = req.params;
    try {
      const attempt = await findAttemptByUserAndQuiz(userId, quizId);
      if (!attempt) {
        return res.status(200).json({ attemptCount: 0 });
      }
      res.json(attempt);
    } catch (error) {
      console.error('Error fetching attempt:', error);
      res.status(500).json({ error: 'Failed to fetch attempt' });
    }
  });

  // GET /api/attempts/:userId/:quizId/score
  // Returns the score of the latest attempt
  app.get('/api/attempts/:userId/:quizId/score', async (req, res) => {
    const { userId, quizId } = req.params;
    try {
      const score = await findAttemptScore(userId, quizId);
      res.json({ score });
    } catch (error) {
      console.error('Error fetching score:', error);
      if (error.message === 'Attempt not found') {
        return res.status(404).json({ error: 'Attempt not found' });
      }
      res.status(500).json({ error: 'Failed to fetch score' });
    }
  });
}
