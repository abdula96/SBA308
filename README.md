# SBA308
I looked into sample README.md's to come up with this one.

# Learner Data Processing

This project provides a JavaScript function that processes learner data from a course, calculating scores and averages based on assignment submissions. The function handles various scenarios such as late submissions and validates input data.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Function Details](#function-details)
- [Error Handling](#error-handling)
- [Example](#example)
- [License](#license)

## Usage

The main function to use is `getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)`. You need to provide three parameters:
1. `courseInfo`: An object containing course details.
2. `assignmentGroup`: An object containing assignment group details.
3. `learnerSubmissions`: An array of learner submission objects.

## Function Details

### `getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)`

- **Parameters**:
  - `courseInfo`: An object with the course ID and name.
  - `assignmentGroup`: An object that includes the assignments and their details.
  - `learnerSubmissions`: An array of submissions made by learners.
  
- **Returns**: An array of objects where each object represents a learner's ID, average score, and scores for each assignment.

### Key Logic:
- Validates that the assignment group belongs to the specified course.
- Skips assignments that are not yet due.
- Handles late submissions by deducting 10% of the assignment's points.
- Calculates each learner's percentage score for each assignment.

## Error Handling

The function includes error handling for:
- Mismatched `course_id` in `assignmentGroup`.
- Invalid `points_possible` values.
- General submission processing errors, which are logged to the console.

## Example

```javascript
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
        { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
        { id: 3, name: "Code the World", due_at: "2023-11-15", points_possible: 500 }
    ]
};

const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
} catch (error) {
    console.error(error.message);
}
# SBA308
