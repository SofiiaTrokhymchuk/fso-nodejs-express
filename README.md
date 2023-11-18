# Phonebook App

This is a simple full-stack application built with Node.js and React, allowing users to manage a list of contacts in a phonebook. This app is a 3rd part of [fullstackopen](https://fullstackopen.com/en) course.

## Features

- Add a new person with a name and phone number to the phonebook.
- Update a person's number if name exists.
- Delete a person from the phonebook.
- Filter contacts by name, showing only those that contain a specified string.

## Getting Started

### Prerequisites

Before running the app, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/SofiiaTrokhymchuk/fso-nodejs-express
   ```

2. Navigate to the project directory:

   ```
   cd fso-nodejs-express
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Usage

1. Start the server:

   ```
   npm start
   ```

2. The React app is built and minified. The production-ready files are located in the `dist` folder. The React app source code can be found [here](https://github.com/SofiiaTrokhymchuk/fullstackopen/tree/main/part2/phonebook).

### Deployment on Fly.io

Follow these steps to deploy the app on fly.io:

1. [Install Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)

2. Sign up and log in to your Fly account using the CLI.

3. Navigate to your project directory.

4. Run the following command to deploy the app:
   ```
   npm run deploy
   ```

This app is already deployed and accessed using the following link: [fso-nodejs-express.fly.dev](https://fso-nodejs-express.fly.dev/)
