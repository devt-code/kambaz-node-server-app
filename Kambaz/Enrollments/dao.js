// import { v4 as uuidv4 } from "uuid";
// export default function EnrollmentsDao(db) {
//   function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = db;
//     enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
//   }

//   function unenrollUserFromCourse(userId, courseId) {
//     const { enrollments } = db;
//     const initialLength = enrollments.length;
//     db.enrollments = enrollments.filter(
//       (e) => !(e.user === userId && e.course === courseId)
//     );
//     if (db.enrollments.length < initialLength) {
//       return { success: true, message: "Unenrolled successfully" };
//     }
//     return { success: false, message: "Enrollment not found" };
//   }

//   // Find all enrollments for a user
//   function findEnrollmentsForUser(userId) {
//     const { enrollments } = db;
//     return enrollments.filter((e) => e.user === userId);
//   }

//   return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentsForUser };
// }

// import { v4 as uuidv4 } from "uuid";

// export default function EnrollmentsDao(db) {
//   const { enrollments } = db;

//   // Enroll a user in a course
//   const enrollUserInCourse = (userId, courseId) => {
//     const exists = enrollments.some(
//       (e) => e.user === userId && e.course === courseId
//     );
//     if (!exists) {
//       const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
//       enrollments.push(newEnrollment);
//       return newEnrollment;
//     }
//     return null;
//   };

//   // Unenroll a user from a course
//   const unenrollUserFromCourse = (userId, courseId) => {
//     const index = enrollments.findIndex(
//       (e) => e.user === userId && e.course === courseId
//     );
//     if (index !== -1) {
//       const removed = enrollments.splice(index, 1);
//       return removed[0];
//     }
//     return null;
//   };

//   // Get all enrollments for a specific user
//   const findEnrollmentsByUser = (userId) => {
//     return enrollments.filter((e) => e.user === userId);
//   };

//   return {
//     enrollUserInCourse,
//     unenrollUserFromCourse,
//     findEnrollmentsByUser,
//   };
// }

import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const { enrollments } = db;

  function enrollUserInCourse(userId, courseId) {
    const exists = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (exists) return exists;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unenrollUserFromCourse(userId, courseId) {
    const index = enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );
    if (index !== -1) enrollments.splice(index, 1);
    return { status: "unenrolled" };
  }

  function findEnrollmentsForUser(userId) {
    return enrollments.filter((e) => e.user === userId);
  }

  return { enrollUserInCourse, unenrollUserFromCourse, findEnrollmentsForUser };
}
