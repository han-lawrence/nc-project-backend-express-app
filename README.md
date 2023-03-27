# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Kanban

### Link to your Trello Board here: https://trello.com/b/7yiHe1nI

To keep track of the tasks involved in this project we're going to use a kanban board. Ensure that you work on one _ticket_ at time. You can click on the ticket to find out more information about what is required for the feature. A ticket is not considered complete unless both the happy path and errors response are handled. You can make use of the checklist on each ticket to keep track of the errors you want to handle. You can also make use of [error-handling.md](error-handling.md) to consider the error codes we may wish to respond with.

**Please ensure you work through the tickets in numerical order.**

## Git Branching and Pull Requests

You will be working on each ticket on a new **branch**.

To create and switch to a new git branch use the command:

```
git checkout -b <new branch name>
```

This will create a branch and move over to that branch. (Omit the `-b` flag if you wish to switch to an already existing branch).

We recommend that you name the branch after the number assigned to each ticket via the header. eg. `ncnews-1`

When pushing the branch to git hub ensure that you make reference to the branch you are pushing to on the remote.

```
git push origin <branch name>
```

From github you can make a pull request and share the link and ticket number via a pull request specific nchelp using the command `nchelp pr`. A tutor will swing by to review your code. Ensure that you keep your trello up to date whilst you await the PR approval. Regular `nchelp` will be available for when you need support.

Once a pull request been accepted be sure to switch back to the main branch and pull down the updated changes.

```
git checkout main

git pull origin main
```

You can tidy up your local branches once they have been pull into main by deleting them:

```
git branch -D <local branch>
```

## Husky

To ensure we are not commiting broken code this project makes use of git hooks. Git hooks are scripts triggered during certain events in the git lifecycle. Husky is a popular package which allows us to set up and maintain these scripts. This project makes use a _pre-commit hook_. When we attempt to commit our work, the script defined in the `pre-commit` file will run. If any of our tests fail than the commit will be aborted.

The [Husky documentation](https://typicode.github.io/husky/#/) explains how to configure Husky for your own project as well as creating your own custom hooks.\_


## .env 

As .env.* is added to the .gitignore, anyone who wishes to clone your repo will not have access to the necessary environment variables.

To run this project locally, you will need to have two PostgreSQL databases set up; one for development and one for testing. PostgreSQL should be installed (npm install postgres) and setup-dbs command run. dotenv is an npm package that handles the configuration of environment variables. Once installed (npm i dotenv) two .env folders should be created for each database, in this case, one development database and one testing; nc_news and nc_news_test. Each file is populated with 
PGDATABASE=<database_name_here>. PGDATABASE is an environment variable used in PostgreSQL, which is an open-source relational database management system.

We can then invoke and access whatever this database system is set to with our connection.js 'pool' file. 

The connection (or idex file should have the follwing; 

const { Pool } = require('pg');
const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV || 'development';


dotenv.config({ path: `${__dirname}/../.env.${ENV}` });

const PGDATABASE = process.env.PGDATABASE;


if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool();

this can now be required in to files and will direct our files to the correct databases. 
