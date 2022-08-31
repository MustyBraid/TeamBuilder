const inquirer = require("inquirer");
const fs = require("fs");

initQuestions = [
  {
    type: "input",
    message: "What is the name of your team?",
    name: "teamName",
  },
  {
    type: "input",
    message:
      "How many departments are in your team? Answer with a number, please",
    name: "numDepartments",
  },
];

class Department {
  constructor(number) {
    this.number = number;
    let questions = [];
    for (let i = 0; i < number; i++) {
      const question = [
        {
          type: "input",
          message: `What is the name of department ${i + 1}?`,
          name: `dep${i + 1}Name`,
        },
        {
          type: "input",
          message: `How many employees are in department ${i + 1}?`,
          name: `employees${i + 1}`,
        },
      ];
      questions = questions.concat(question);
    }
    this.questions = questions;
  }
}

initPrompt = inquirer.prompt(initQuestions).then((answers) => {
  const departments = new Department(answers.numDepartments);
  return departments;
});

//const departmentQuestions = inquirer.prompt(initPrompt.departments);

//notes below, code above

// const whatever = new Department(number);

// class Employee {
//   //this constructor will get the name, job title, and contact information of each employee
//   constructor(name, title, contact) {
//     this.name = name;
//     this.title = title;
//     this.contact = contact;
//   }
// }

//to-do:
//Make a class constructor for each department's question block. Just to flex
//num departments > dep1 num people and descriptions > dep 2 num people and descriptions > ...
// make sure to keep department names clear. throw resulting answer objects into large html block as string literals
// Add debugger things. Check that certain inputs are integers, others aren't blank, etc.
// ??????????
// Profit
