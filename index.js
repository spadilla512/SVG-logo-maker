const inquirer = require("inquirer");
const fs = require("fs");

const { Square, Triangle, Circle } = require("./lib/shapes.js");

function questions() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "text",
                message: "Enter up to 3 letters for your logo:",
            },
            {
                type: "input",
                name: "textColor",
                message: "Enter a color keyword OR a hexadecimal number for text color:"
            },
            {
                type: "list",
                name: "shape",
                message: "Select the shape of your logo:",
                choices: ["Square", "Triangle", "Circle"],
            },
            {
                type: "input",
                name: "shapeColor",
                message: "Enter a color keyword OR hexadecimal number for the shape color:"
            },
        ])
        .then((answers) => {
            if (answers.text.length > 3) {
                console.log("Max of only 3 characters");
                questions();
            } else { saveAnswers
            saveAnswers("svglogo", answers);
            }
        });
};

function saveAnswers(fileName, answers) {
    let svgLogo = "";
    svgLogo = 
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgLogo += "<g>";
    svgLogo += `${answers.shape}`;

    let selectedShape;
    if (answers.shape === "Square") {
        selectedShape = new Square();
        svgLogo += `rect x="50" y="50" width="200" height="100" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Triangle") {
        selectedShape = new Triangle();
        svgLogo += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else {
        selectedShape = new Circle();
        svgLogo += `<circle cx="150" cy="100" r="80" fill="${answers.shapeColor}"/>`;
    }

    svgLogo += `<text x="150" y="125" text-anchor="middle" font-size="50" fill="${answers.textColor}">${answers.text}</text>`;
    svgLogo += "</g>";
    svgLogo += "</svg>";

    fs.writeFile(fileName, svgLogo, (err) => {
        err ? console.log(err) : console.log("Success! Your logo has been created!");
    });
}

questions();