const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");

//const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "github_username",
            message: "What is your GitHub username? "
        },


        {
            type: "input",
            name: "project_name",
            message: "What is your project's name?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project?"
        },
        {
            type: "list",
            name: "license",
            choices: ["ISC", "MIT", "BSD"],
            message: "What kind of license should your project have? User can choose from list of items?"
        },
        {
            type: "input",
            name: "dependencies",
            message: "What command should be run to install dependencies? "
        },
        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests? "
        },
        {
            type: "input",
            name: "using_repo",
            message: "What does the user need to know about using the repo?"
        },
        {
            type: "input",
            name: "contributing_repo",
            message: "What does the user need to know about contributing to the repo?"
        }
    ]);
}

const writeFileAsync = util.promisify(fs.writeFile);

function writeToFile(fileName, data) {
    let fileContents =
        `# ${dataproject_name}

    [![GitHub license](https://img.shields.io/badge/license-GPL%203.0-blue.svg)](https://github.com/calvincarter/demo_day_project2)
    ​
    ## Description
    ${data.description}
    ​
    the best project ever project
    ​
    ## Table of Contents 
    ​
    * [Installation](#installation)
    ​
    * [Usage](#usage)
    ​
    * [License](#license)
    ​
    * [Contributing](#contributing)
    ​
    * [Tests](#tests)
    ​
    * [Questions](#questions)
    ​
    ## Installation
    ​
    To install necessary dependencies, run the following command:
    
    ${data.dependencies}
    ​
   
    npm i
       
    ​
    ## Usage
    ​
    nothing just welcome all hands on deck
    ​
    ## License
    ​
    This project is licensed under the ${data.license} license.
      
    ## Contributing
    ​${data.contributing_repo}
    please help

    ​
    ## Tests
    ​
    To run tests, run the following command:
    ${data.tests}
    ​
    ​
    ## Questions
    ​
    <img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
    ​
    If you have any questions about the repo, open an issue or contact [${data.github_username}](https://api.github.com/users/${data.login}).`
}

function generateReadMe() {
    inquirer.prompt(questions).then(function(answers) {
        console.log(answers);
        const user = answers;
        axios.get(`https://api.github.com/users/${user.github_username}`).then(resp => {
            user.avatar_url = resp.data.avatar_url;
            writeToFile("README.md", user);
        })
    });
}

// async function init() {
//     console.log("hi")
//     try {
//         const answers = await promptUser();

//         const html = generateHTML(answers);

//         await writeFileAsync("index.html", html);

//         console.log("Successfully wrote to index.html");
//     } catch (err) {
//         console.log(err);
//     }
// }

// generateReadMe();
promptUser();