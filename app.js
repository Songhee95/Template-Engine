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
    },
    {
        type:"confirm",
        name:"more",
        message:"Do you have more team member?: "
    }
];

const teamMember = [];

function output(divs){
    fs.writeFileSync(outputPath, divs);
}

function repeat(add, response){
    if(add.more ===true){
        userInput();
    }else{
        const divs = render(response);
        output(divs);
    }
}

function userInput() {
    inquirer
    .prompt(questions)
    .then((response) => {
        if(response.role==='Engineer'){
            inquirer
            .prompt(userGithub)
            .then((add) => {
                response.github = add.specific;
                const forEngineer = new Engineer(response.names, response.id, response.email, response.github);
                teamMember.push(forEngineer);
                repeat(add,teamMember);
            });
        }else if(response.role==='Intern'){
            inquirer
            .prompt(userSchool)
            .then((add) => {
                response.school = add.specific;
                const forIntern = new Intern(response.names, response.id, response.email, response.school);
                teamMember.push(forIntern);
                repeat(add,teamMember);
            });
        }else{
            inquirer
            .prompt(userOfficeNumber)
            .then((add) => {
                response.officeNumber = add.specific;
                const forManager = new Manager(response.names, response.id, response.email, response.officeNumber);
                teamMember.push(forManager);
                repeat(add, teamMember);
            });
        }
    })
}

userInput();



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

