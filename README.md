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

+ More info @ https://nodejs.dev/learn/the-package-json-guide
+ More info @ https://nodejs.dev/learn/the-package-lock-json-file
+ More info @ https://nodejs.dev/learn/uninstalling-npm-packages

## Find the installed version of an npm package

    npm list 
    npm list -g // for globally installed packages
    npm view [package_name] version // to see the latest available version of the package on the npm repository

## npm global or local packages?

+ In your code you can only require local packages
+ In general, all packages should be installed locally.
+ Updating a global package would make all your projects use the new release, and as you can imagine this might cause nightmares in terms of maintenance, as some packages might break compatibility with further dependencies, and so on.
+ A package should be installed globally when it provides an executable command that you run from the shell (CLI), and it's reused across projects.

## npm dependencies and devDependencies

When you add the -D flag, or --save-dev, you are installing it as a development dependency, which adds it to the devDependencies list.

Development dependencies are intended as development-only packages, that are unneeded in production. For example testing packages, webpack or Babel.

When you go in production, if you type npm install and the folder contains a package.json file, they are installed, as npm assumes this is a development deploy.

You need to set the --production flag (npm install --production) to avoid installing those development dependencies.

## The npx Node.js Package Runner

+ npx lets you run code built with Node.js and published through the npm registry.
+ Examples:
    + running the vue CLI tool to create new applications and run them: `npx @vue/cli create my-vue-app`
    + creating a new React app using create-react-app: `npx create-react-app my-react-app`



 
