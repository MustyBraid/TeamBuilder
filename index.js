const inquirer = require("inquirer");
const fs = require("fs");
var { Observable } = require("rxjs");

//We need this to be a pseudo 'this' in the inquirer.subscribe block. It's complicated, but removing this line will break everything
var question;

var numEmployees = 1;

let answerStorage = {};

const initQuestions = [
  {
    type: "input",
    message: "What is the name of your team?",
    name: "teamName",
  },
  {
    type: "input",
    message: "What is the team manager's name?",
    name: "managerName",
  },
  {
    type: "input",
    message: "What is the team manager's employee ID?",
    name: "managerID",
  },
  {
    type: "input",
    message: "What is the team manager's email address?",
    name: "managerEmail",
  },
  {
    type: "input",
    message: "What is the team manager's office number?",
    name: "managerOffice",
  },
];

const addonQuestion = [
  {
    type: "list",
    message:
      'Is there another employee? If so, what is their role? If not hit enter or select "No"',
    name: `employeeRole`,
    choices: ["Intern", "Engineer", "No"],
    default: "No",
    askAnswered: true,
  },
];

const engineerQuestions = [
  {
    type: "input",
    message: "What is this engineers name?",
    name: `engineerName`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this engineer's employee ID?",
    name: `engineerID`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this engineer's email address?",
    name: `engineerEmail`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this engineer's Github username?",
    name: `engineerGit`,
    askAnswered: true,
  },
];

const internQuestions = [
  {
    type: "input",
    message: "What is this intern's name?",
    name: `internName`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this intern's employee ID?",
    name: `internID`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this intern's email address?",
    name: `internEmail`,
    askAnswered: true,
  },
  {
    type: "input",
    message: "What is this intern's school?",
    name: `internSchool`,
    askAnswered: true,
  },
];

function writeFiles(answerStorage) {
  fs.writeFile("index.html");
  fs.writeFile("style.css");
}

function employeeMaker(employeeRole) {
  switch (employeeRole) {
    case "Intern":
      internQuestions.forEach((element) => question.next(element));
      question.next(addonQuestion[0]);
      break;
    case "Engineer":
      engineerQuestions.forEach((element) => question.next(element));
      question.next(addonQuestion[0]);
      break;
    case "No":
      question.complete();
  }
}

var prompts = new Observable((subscriber) => {
  question = subscriber;
  initQuestions.forEach((element) => question.next(element));
  question.next(addonQuestion[0]);
});

inquirer.prompt(prompts).ui.process.subscribe({
  next(x) {
    answerStorage[x.name + numEmployees] = x.answer;
    if (x.name == `employeeRole`) {
      numEmployees++;
      //every 'employeeRole#' key will have its # lag behind by exactly one  because I'm stupid. Luckily this value is easily ignored, but it's important not to be misled
      employeeMaker(x.answer);
    }
  },
  error(err) {
    console.log("Something went wrong: " + err);
  },
  complete() {
    console.log("All done, enjoy the organization page!");
    console.table(answerStorage);
    //writeFiles(answerStorage);
  },
});
