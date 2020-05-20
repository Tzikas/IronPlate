require('dotenv').config();
const mongoose = require("mongoose");
const question = require("../models/question");
console.log(process.env.MONGODB_URI)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/quiz-questions";
console.log("Connecting DB to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

const questions = [
  {
    question: "Java and JavaScript are the same thing?",
    choices: ["True", "False"],
    answer: "False",
    category: "javascript",
  },
  {
    question: "JavaScript is case sensitive?",
    choices: ["True", "False"],
    answer: "True",
    category: "javascript",
  },
  {
    question: "How do you create a single line comment in JavaScript?",
    choices: ["With a forward slash & asterick", "With  X Æ A-12", "With two forward slashes "],
    answer: "With two forward slashes",
    category:'javscript'
  },
  {
    question: "How do statements end in JavaScript?",
    choices: ["with a period ", "with a semicolon "," with a question mark "],
    answer: "with a semicolon ",
    category:'javascript' 
  },
  {
    question: "How do you create a multi-line comment in JavaScript?",
    choices: ["With a forward slash & asterick", "With  the word comment", "With two forward slashes "],
    answer: "With a forward slash & asterick",
    category:'javscript'
  },
  {
    question: "In JSX, event listener names are written in",
    choices: ["TigerCase", "DogCase","CamelCase"],
    answer: "CamelCase",
    category:'react'
  },
  {
    question: "This command generates a boilerplate version of a React application.",
    choices: ["npx create-react-app", "npm i", "npm start"],
    answer: "npx create-react-app",
    category:'react'
  },
  {
    question: "Data from state is distributed through the application via ___.",
    choices: ["this.state", "props","setState()"],
    answer: "setState()",
    category:'react'
  },
  {
    question: "What type of components allow you to initialize state?",
    choices: ["Class components", "Pure components", "Object components"],
    answer: "Class components",
    category:'react'
  },
  {
    question: "Starts the development server",
    choices: ["start", "Open Sesame", 'npm start'],
    answer: "npm start",
    category:'react'
  },
];

question
  .insertMany(questions)
  .then((questions) => {
    console.log(questions);
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));
