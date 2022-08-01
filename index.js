const inquirer = require('inquirer');
const fs = require('fs');


questions1 = [
    {
        type: 'input',
        message: 'What is the name of your team?',
        name: 'teamName',
      },
    {
        type: 'input',
        message: 'How many departments are in your team?',
        name: 'departments',
    },
]

res = inquirer
    .prompt(questions1)
    //.then(console.log('Oh dear god'))
    .then((answer) => {
        return(answer);
    });

async function logic() {
    await res;
    console.log(res);
}

logic();

//to-do:
//Make a class constructor for each department's question block. Just to flex
//num departments > dep1 num people and descriptions > dep 2 num people and descriptions > ...
// make sure to keep department names clear. throw resulting answer objects into large html block as string literals
// Add debugger things. Check that certain inputs are integers, others aren't blank, etc. 
// ??????????
// Profit