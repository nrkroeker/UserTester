import * as Models from "models";

export const cards: Models.Card[] = [
    { id: 1, label: "Hire new employee", initialOrder: 1 },
    { id: 2, label: "Create schedule", initialOrder: 3 },
    { id: 3, label: "View timesheet", description: "Only managers view full timesheet", initialOrder: 2 }
];

export const messages: Models.TestMessage[] = [
    { title: "Welcome to the employee management card sort", content: "Please sort the following management tasks into groups however you see fit", position: Models.MessagePosition.Start }
];

export const questions: Models.SurveyQuestion[] = [
    { type: Models.QuestionType.Input, label: "Name", required: true },
    { type: Models.QuestionType.Input, label: "Email", description: "No emails will be sent without your consent. This is just for data purposes." },
    { type: Models.QuestionType.Select, label: "Gender", options: ["Male", "Female", "Other"], required: false }
];

export const cardSortTest: Models.CardSortTest = {
    id: 1,
    title: "Employee Management",
    description: "Various tasks required to manage employees",
    type: Models.TestType.CardSort,
    status: Models.TestStatus.Draft,
    groups: ["Scheduling", "Hiring"],
    cards,
    messages,
    questions
};
