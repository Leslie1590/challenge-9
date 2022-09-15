// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your project name!');
              return false;
            }
          }
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email? (Required)',
      validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email!');
            return false;
          }
        }
  },
    {
        type: 'input',
        name: 'userStory',
        message: 'What is the user story for this project? (Required)',
        validate: storyInput => {
            if (storyInput) {
              return true;
            } else {
              console.log('Please enter a description!');
              return false;
            }
          }
    },
    {
        type: 'confirm',
        name: 'confirmCriteria',
        message: 'Would you like to give the acceptance criteria for this project?',
        default: true
    },
    {
        type: 'input',
        name: 'criteria',
        message: 'Provide this criteria for this project:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
    },
    {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('Please enter your GitHub link!');
            return false;
          }
        }
      },
]

// TODO: Create a function to write README file
function writeReadme() {
    console.info('questions:', questions);
    fs.writeFile('README.md', JSON.stringify(questions), () => 
      console.log('Successfully wrote README!'))
};

// TODO: Create a function to initialize app
function init(reponse) {
    inquirer.prompt(questions).then(answers => {
      const response = generateMarkdown(answers);
      console.log(questions);
      writeReadme('generateREADME.md', reponse)
    })
    .then(questions)
}

//  Function call to initialize app
init();
