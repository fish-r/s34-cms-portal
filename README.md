# s34-cms-portal
This repository contains the source code for the Content Management System under Team S34's Capstone project

## Pre-Requisites
- 

## Project Structure
The project structure is as shown below.
Frontend uses Nextjs framework which runs on React library. Redux toolkit is also included.
Backend uses Nestjs framework.
```
README.md
client // Frontend Directory
   |-- .gitignore
   |-- README.md
   |-- app
   |-- lib
   |   |-- providers.tsx
   |   |-- redux
   |-- next.config.mjs
   |-- package-lock.json
   |-- package.json
   |-- public
   |-- tsconfig.json
server // Backend Directory
   |-- .eslintrc.js
   |-- .gitignore
   |-- .prettierrc
   |-- nest-cli.json
   |-- package-lock.json
   |-- package.json
   |-- src
   |   |-- app.controller.spec.ts
   |   |-- app.controller.ts
   |   |-- app.module.ts
   |   |-- app.service.ts
   |   |-- main.ts
   |-- test
   |-- tsconfig.build.json
   |-- tsconfig.json
```

## Getting Started
1. Clone this project
```
git clone https://github.com/fish-r/s34-cms-portal.git
```
2. Install dependencies in each of the projects:
```
cd client
npm install

cd server
npm install
```
3. Running frontend
Run the command below, and then head over to (http://localhost:3000)
```
npm run dev
```
4. Running backend
Run the command below, and then head over to (http://localhost:3001)
```
npm run start dev
```
