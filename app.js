const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [
    {
        type: "input",
        name: "names",
        message: "Name: "
    },
    {
        type: "input",
        name: "email",
        message: "email address: "
    },
    {
        type:"list",
        name: "role",
        message: "What is your role?",
        choices: ["Engineer", "Intern" , "Manager"]
    },
    {
        type: "input",
        name: "id",
        message: "Enter your ID number: ",
    }
];

const userGithub = [{
        type:"input",
        name: "specific",
        message:"what is your Github Id?: "
    },
    {
        type:"confirm",
        name:"more",
        message:"Do you have more team member?: "
    }
];
const userSchool =[
    {
        type:"input",
        name: "specific",
        message:"what is your school Name?: "
    },
    {
        type:"confirm",
        name:"more",
        message:"Do you have more team member?: "
    }
];
const userOfficeNumber = [
    {
        type:"input",
        name: "specific",
        message:"what is your Office Number?: "
    }
];

const teamMember = [];

function userInput() {
    inquirer
    .prompt(questions)
    .then((response) => {
        if(response.role==='Engineer'){
            inquirer
            .prompt(userGithub)
            .then((add) => {
                response.specific = add.specific;
                teamMember.push(response);
            if(add.more ===true){
                userInput();
            }else{
                console.log(teamMember);
                return teamMember;
            }
            });
        }else if(response.role==='Intern'){
            inquirer
            .prompt(userSchool)
            .then((add) => {
                response.specific = add.specific;
                teamMember.push(response);
                if(add.more ===true){
                    userInput();
                }else{
                    console.log(teamMember);
                    return teamMember;
                }
            })
        }else{
            inquirer
            .prompt(userOfficeNumber)
            .then((add) => {
                response.specific = add.specific;
                teamMember.push(response);
                if(add.more === true){
                    userInput();
                }else{
                    console.log(teamMember);
                    return teamMember;
                }
            })
        }
    })
}
userInput();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
