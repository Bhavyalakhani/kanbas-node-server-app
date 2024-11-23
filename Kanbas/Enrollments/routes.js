import * as enrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentsRoutes(app) {

    app.post("/api/enrollments/enroll/:courseId/:userId", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.params;
        enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.status(200).json({ message: "User enrolled successfully" }); // Ensure response ends
    });

    app.delete("/api/enrollments/unenroll/:courseId/:userId", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.params;
        console.log("unenerolling from : ")
        console.log(userId, courseId);
        enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        console.log("unenrolled")
        res.status(200).json({ message: "User unenrolled successfully" }); // Ensure response ends
    });

    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.getEnrollments();
        res.json(enrollments);
    });
}