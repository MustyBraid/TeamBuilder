const inquirer = require("inquirer");
const fs = require("fs");
var { Observable } = require("rxjs");
const { off } = require("process");

//We need this variable declaration to serve as a pseudo 'this' in the inquirer.subscribe block. It's complicated, but removing this line will break everything.
var question;

var numEmployees = 1;

let answerStorage = [];
//let answerStorage = {};

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

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    super.getRole();
    return "Manager";
  }
}

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    super.getRole();
    return "Intern";
  }
}

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    super.getRole();
    return "Engineer";
  }
}

function writeFiles(answerStorage) {
  let resetCss =
    "* {margin: 0;padding: 0;box-sizing: border-box;}html {height: 100%;}body {min-height: 100%;line-height: 1;font-family: sans-serif;}nav {list-style-type: none;}h1, h2, h3, h4, h5, h6 {font-size: 100%;}input, select, option, optgroup, textarea, button, pre, code {font-size: 100%;font-family: inherit;}ul {list-style: none;}";
  let css = "";
  let htmlStart = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${answerStorage.teamName1}</title> <link rel="stylesheet" href="./reset.css"> <link rel="stylesheet" href="./style.css"></head><body>`;

  function htmlMaker(element) {
    //TODO: Finish this logic
    if (element[0]) {
      htmlStart += `${element[1]}`;
    }
  }
  answerStorage.forEach(htmlMaker);

  // fs.writeFile("index.html", htmlStart + );
  // fs.writeFile("style.css");
  // fs.writeFile("reset.css", resetCss);
}

//This function routes our questioning based on the selected role of the employee questions are about to be asked about
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
    //answerStorage[x.name + numEmployees] = x.answer;
    answerStorage.push([x.name + numEmployees, x.answer]);

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
    writeFiles(answerStorage);
  },
});
