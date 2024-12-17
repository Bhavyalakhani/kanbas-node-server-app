import * as dao from './dao.js';

export default function QuizRoutes(app) {
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    try {
      const quizzes = await dao.findQuizzesByCourse(cid);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const quiz = await dao.findQuizById(qid);
      if (!quiz) {
        res.status(404).send('Quiz not found');
      } else {
        res.json(quiz);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const { cid } = req.params;
    try {
      const newQuiz = await dao.createQuiz({ ...req.body, course: cid });
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const updatedQuiz = await dao.updateQuiz(qid, req.body);
      if (!updatedQuiz) {
        res.status(404).send('Quiz not found');
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    try {
      const result = await dao.deleteQuiz(qid);
      if (result) {
        res.sendStatus(204);
      } else {
        res.status(404).send('Quiz not found');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/quizzes/:qid/publish", async (req, res) => {
    const { qid } = req.params;
  
    try {
      const quiz = await dao.findQuizById(qid);
  
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
  
      // if (quiz.published) {
      //   return res.status(400).send('Quiz is already published');
      // }
  
      const updatedQuiz = await dao.updateQuiz(qid, { published: true });
  
      if (!updatedQuiz) {
        return res.status(500).send('Failed to publish the quiz');
      }
  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/quizzes/:qid/unpublish", async (req, res) => {
    const { qid } = req.params;
  
    try {
      const quiz = await dao.findQuizById(qid);
  
      if (!quiz) {
        return res.status(404).send('Quiz not found');
      }
  
      // if (!quiz.published) {
      //   return res.status(400).send('Quiz is already unpublished');
      // }
  
      const updatedQuiz = await dao.updateQuiz(qid, { published: false });
  
      if (!updatedQuiz) {
        return res.status(500).send('Failed to unpublish the quiz');
      }
  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  
}
