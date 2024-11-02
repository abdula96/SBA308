// The provided course information
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// Main function to get learner data
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    // Validate course_id
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error('Invalid AssignmentGroup: course_id does not match CourseInfo id.');
    }

    const results = {};

    // Process each assignment in the assignment group
    for (let assignment of assignmentGroup.assignments) {
        const dueDate = new Date(assignment.due_at);

        // Skip assignments that are not yet due
        if (dueDate > new Date()) {
            continue;
        }

        // Process each learner submission
        for (let submission of learnerSubmissions) {
            const learnerId = submission.learner_id;
            const assignmentId = submission.assignment_id;
            const score = submission.submission.score;
            const pointsPossible = assignment.points_possible;
            const submittedAt = new Date(submission.submission.submitted_at);

            // Initialize learner entry if not present
            if (!results[learnerId]) {
                results[learnerId] = {
                    id: learnerId,
                    avg: 0,
                    totalWeightedScore: 0,
                    totalPointsPossible: 0,
                    scores: {}
                };
            }

            try {
                // Validate points_possible
                if (typeof pointsPossible !== 'number' || pointsPossible <= 0) {
                    throw new Error(`Invalid points_possible value for assignment ${assignmentId}.`);
                }

                let finalScore = score;

                // Deduct 10% for late submissions
                if (submittedAt > dueDate) {
                    finalScore -= 0.1 * pointsPossible;
                }

                // Calculate percentage score
                const percentageScore = (finalScore / pointsPossible);
                results[learnerId].scores[assignmentId] = percentageScore;

                // Update total weighted score and points possible
                results[learnerId].totalWeightedScore += finalScore;
                results[learnerId].totalPointsPossible += pointsPossible;

            } catch (error) {
                console.error(`Error processing submission for learner ${learnerId}, assignment ${assignmentId}: ${error.message}`);
            }
        }
    }

    // Calculate the averages and return the final results
    return Object.values(results).map(learner => {
        if (learner.totalPointsPossible > 0) {
            learner.avg = (learner.totalWeightedScore / learner.totalPointsPossible);
        } else {
            learner.avg = 0; // Default to 0 if no points possible
        }
        // Clean up unnecessary properties
        delete learner.totalWeightedScore;
        delete learner.totalPointsPossible;
        return learner;
    });
}

// Call the function and log the result
try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
} catch (error) {
    console.error(error.message);
}
