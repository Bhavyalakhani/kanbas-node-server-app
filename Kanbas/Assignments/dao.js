import model from "./model.js";

export function updateAssignment(assignmentId,assignmentUpdates) {
  return model.updateOne({_id: assignmentId}, assignmentUpdates);
}
  
export async function deleteAssignment(assignmentId) {
  return model.deleteOne({_id: assignmentId});
}
   
export function createAssignment(assignment) {
  return model.create(assignment);
}
  
export function findAssignmentsForCourse(courseId) {
  return model.find({course: courseId});
}