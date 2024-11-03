# Rimba Ananta Vikasa Indonesia Rekrutmen Process

This project is a full-stack application that includes a server-side component built with Node.js and a client-side component built with Vue.js using Vite.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Server Side](#server-side)
  - [Client Side](#client-side)
- [Environment Variables](#environment-variables)

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB (running locally or accessible via a cloud provider)

### Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/daffatabiano/Rimba-Ananta-Vikasa-Indonesia.git
cd Rimba-Ananta-Vikasa-Indonesia
```

# Running Applications

### Server Side

```bash
cd server
npm install
```

#### Add .env Files

```plainText
PORT='3000'
MONGO_URI='mongodb+srv://daffatabianoo:Daffatabiano14@cluster0.mrv4i.mongodb.net/rimba'
JWT_SECRET='daffatabiano'
```

```bash
npm start
or
nodemon
```

#### if don't have nodemon

you can install first as a global or just project with copy this command

```bash
npm i -g nodemon / npm i nodemon
```

## Client Side

```bash
cd ../client/vue-app-project
npm i
```

```bash
npm run dev
```
