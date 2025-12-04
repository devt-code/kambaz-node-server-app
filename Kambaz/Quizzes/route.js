import * as dao from "./dao.js";

const mustBeSignedIn = (req, res, next) => {
  const me = req.session?.currentUser;
  if (!me) return res.sendStatus(401);
  next();
};
const mustBeFaculty = (req, res, next) => {
  const me = req.session?.currentUser;
  if (!me) return res.sendStatus(401);
  if (me.role !== "FACULTY") return res.sendStatus(403);
  next();
};

export default function QuizRoutes(app) {
  app.get("/api/courses/:cid/quizzes", mustBeSignedIn, async (req, res) => {
    const list = await dao.findQuizzesForCourse(req.params.cid);
    res.json(list);
  });

  app.post("/api/courses/:cid/quizzes", mustBeFaculty, async (req, res) => {
    const me = req.session.currentUser;
    const quiz = await dao.createQuiz({
      ...req.body,
      course: req.params.cid,
      createdBy: me._id,
    });
    res.json(quiz);
  });

  app.get("/api/quizzes/:qid", mustBeSignedIn, async (req, res) => {
    const q = await dao.findQuizById(req.params.qid);
    if (!q) return res.sendStatus(404);
    res.json(q);
  });

  app.put("/api/quizzes/:qid", mustBeFaculty, async (req, res) => {
    const saved = await dao.updateQuiz(req.params.qid, req.body);
    res.json(saved);
  });

  app.post("/api/quizzes/:qid/publish", mustBeFaculty, async (req, res) => {
    const saved = await dao.updateQuiz(req.params.qid, { published: true });
    res.json(saved);
  });
  app.post("/api/quizzes/:qid/unpublish", mustBeFaculty, async (req, res) => {
    const saved = await dao.updateQuiz(req.params.qid, { published: false });
    res.json(saved);
  });

  app.delete("/api/quizzes/:qid", mustBeFaculty, async (req, res) => {
    const status = await dao.deleteQuiz(req.params.qid);
    res.send(status);
  });

  app.get("/api/quizzes/:qid/questions", mustBeSignedIn, async (req, res) => {
    res.json(await dao.listQuestions(req.params.qid));
  });

  app.post("/api/quizzes/:qid/questions", mustBeFaculty, async (req, res) => {
    const created = await dao.createQuestion(req.params.qid, req.body);
    res.json(created);
  });

  app.put("/api/questions/:questionId", mustBeFaculty, async (req, res) => {
    const saved = await dao.updateQuestion(req.params.questionId, req.body);
    res.json(saved);
  });

  app.delete("/api/questions/:questionId", mustBeFaculty, async (req, res) => {
    const status = await dao.deleteQuestion(req.params.questionId);
    res.send(status);
  });

  app.get(
    "/api/quizzes/:qid/attempts/me/last",
    mustBeSignedIn,
    async (req, res) => {
      const me = req.session.currentUser;
      const last = await dao.findLastAttemptForUserQuiz(me._id, req.params.qid);
      res.json(last);
    }
  );

  app.post("/api/quizzes/:qid/attempts", mustBeSignedIn, async (req, res) => {
    const me = req.session.currentUser;
    const quiz = await dao.findQuizById(req.params.qid);
    if (!quiz) return res.sendStatus(404);
    if (!quiz.published)
      return res.status(403).json({ message: "Quiz not published" });

    const taken = await dao.countAttemptsForUserQuiz(me._id, req.params.qid);
    if (quiz.multipleAttempts) {
      if (taken >= (quiz.attemptsAllowed || 1)) {
        return res.status(403).json({ message: "No attempts remaining" });
      }
    } else {
      if (taken >= 1)
        return res.status(403).json({ message: "Already attempted" });
    }

    const saved = await dao.submitAttempt(
      me._id,
      req.params.qid,
      req.body?.answers || []
    );
    res.json(saved);
  });
}
