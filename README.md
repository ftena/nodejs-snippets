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

 
