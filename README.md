# nodejs-snippets
Node.js snippets

# Useful info

## Installing dependencies

If a project has a package.json file, by running it will install everything the project needs, in the node_modules folder, creating it if it's not existing already:

    npm install

You can also install a specific package by running

    npm install <package-name>

Often you'll see more flags added to this command:

+ --save-dev installs and adds the entry to the package.json file devDependencies
+ --no-save installs but does not add the entry to the package.json file dependencies
+ --save-optional installs and adds the entry to the package.json file optionalDependencies
+ --no-optional will prevent optional dependencies from being installed

The difference between devDependencies and dependencies is that the former contains development tools, like a testing library, while the latter is bundled with the app in production.

## Running tasks

    npm run <task-name>


## Installation location

The npm root -g command will tell you where that exact location is on your machine.

## Use or execute a package installed using npm

To use it in your code, you just need to import it into your program using require:

    const express = require('express')

If the package is an executable:

    npm install cowsay
    npx cowsay take me out of here

## About package.json

More info @ https://nodejs.dev/learn/the-package-json-guide
More info @ https://nodejs.dev/learn/the-package-lock-json-file
