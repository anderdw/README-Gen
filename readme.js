const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your Project?",
            name: "title"
        },
        {
            type: "input",
            message: `Enter the description of your project:`,
            name: "description"
        },
        {
            type: "input",
            message: "What are the installation instructions for this project?",
            name: "installation"
        },
        {
            type: "input",
            message: "How would you like your application to be used?",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter the names of the Contributors to this project:",
            name: "contribution"
        },
        {
            type: "input",
            message: "What are your instructions for testing?",
            name: "test"
        },
        {
            type: "checkbox",
            message: "Please select a license, if none is require please hit Enter",
            choices: [
                "Apache",
                "MIT",
                "ISC",
                "GNU GPLv3"
            ],  
            name: "license"
        },
        {
            type: "input",
            message: "Are there any sources that you want to cite for this project?",
            name: "citations"
        },
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
    ]);
}

function generateMarkdown(response) {
    return `

# Title
 ${response.title}

# Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage) 
- [Contributing](#contributing)
- [Test](#test)
- [Citations](#citations)
- [License](#license) 
- [Questions](#questions)
- [Email](#email)
- [Video](#video)

## Description:
${response.description}

![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")
   
## Installation:
    ${response.installation}
## Usage:
    ${response.usage}
## Contributing:
    ${response.contribution}
## Test:
    ${response.test}
## Citations:
    ${response.citations}
## License:
    For more information about the License, click on the link below.
    
- [License](https://opensource.org/licenses/${response.license})
## Questions:
    If you have any questions please feel free to reach me through my Github or my email below!
- [GitHub Profile](https://github.com/${response.username})

## Email:
- For any additional questions please reach out to my personal email @: ${response.email}.

## Video:
- If you want to see a video of this application running please click here:
[Video](https://youtu.be/LQdI3Ek4oI4)
`;
}

// function to initialize program
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Success!");
    } catch (err) {
        console.log(err);
    }
}

// function call to initialize program
init();
