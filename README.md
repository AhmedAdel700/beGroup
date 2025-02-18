# For Starting The Project

## This Project Consists Of 2 Parts : The Frontend And The Strapi API

- File Structure: 

- **/frontend**
- **/Frontend-Assessment-Backend**
- Both folders are located at the same level inside the project root directory.

## Strapi API Repo Is Not Included In The Repository

### Installation For Frontend:

1. clone this project(repo) or download it localy
2. cd frontend
3. install the required packages via npm install
4. run the following command to start the project => npm run dev

### For Strapi API Please Follow The Following Instructions:

## Setup and Running Strapi API Locally

### Prerequisites

- Node.js (Refer to [Node.js website](https://nodejs.org/) for installation)
- npm (Usually comes with Node.js installation)
- Strapi (This project requires Strapi to be installed globally)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/DigiFly-Development/Frontend-Assessment-Backend.git
   ```
2. Navigate to the project directory:
   ```
   cd Frontend-Assessment-Backend
   ```
3. Install Strapi globally (if not already installed):
   ```
   npm install strapi -g
   ```
4. Install project dependencies:
   ```
   npm install
   ```
5. Start the Strapi server in development mode:
   ```
   strapi start
   ```

**Important Note:** If you face an issue while using `npm install` and receive a network error, you might need to delete the existing `node_modules` folder and rerun the `npm install` command.

## API Endpoints

### `/user-informations` (GET)

Retrieves a list of user information entries from the database.

**Usage:**

```
GET http://localhost:1337/user-informations
```

### `/user-informations` (POST)

Submits new user information to the database.

**Request Body Format:**

```
{
  "FirstName": "Test",
  "LastName": "Name",
  "Email": "testmail@email.com",
  "Phone": "501105191001"
}
```

**Usage:**

```
POST http://localhost:1337/user-informations
```
