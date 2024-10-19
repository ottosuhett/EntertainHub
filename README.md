# EntertainHub 🎮

EntertainHub is a platform where you can create, manage, and explore your favorite lists of games. Store your favorite media and track game progress.

## 🚀 Getting Started

### Cloning the repository

To get started with EntertainHub, follow the steps below to clone the repository and set up the environment on your machine.

1. Clone this repository:

```bash
git clone https://github.com/ottosuhett/EntertainHub.git
```
2. Navigate to the project directory:
```bash
cd entertain-hub
```
3. Install the required dependencies using your preferred package manager:
```bash
npm install
```
or 
```bash
yarn install
```
or
```bash
pnpm install
```

4. Setting up environment variables (API Keys)

This project uses the RAWG API to fetch game data. You will need your own API key to use EntertainHub's features. Follow these steps:

1. Create a .env.local file in the root directory of the project:

```bash
touch .env.local
```
2. Open the .env.local file and add your RAWG API key by replacing <YOUR_RAWG_API_KEY> with your key:

- **NEXT_PUBLIC_API_KEY=<YOUR_RAWG_API_KEY>**
- **JWT_SECRET=myVeryStrongSecretKey**

The JWT_SECRET variable is also configurable and can be set to any secret key of your choice for JWT authentication.

Running the development server
You can now run the local development server:
```bash
npm run dev
```
or 
```bash
yarn dev
```
or
```bash
pnpm dev
```

The project will run on http://localhost:3000. Open this URL in your browser to view EntertainHub.

📦 Features
- **Custom list management: Create, edit, and delete your game lists.**
- **JWT Authentication: Secure user registration and login.**
- **Game progress tracking: Update and track game progress.**
- **RAWG API integration: Fetch detailed game data (platforms, ratings, release dates, etc.).**
-**User-friendly interface: Intuitive UI to manage lists and track progress.**

🛠️ Available Scripts
In the project directory, you can run the following scripts:

- **npm run dev**: Runs the development server.
- **npm run build**: Builds the app for production.
- **npm run start**: Runs the built app in production mode.
- **npm run lint**: Runs the linter to find and fix issues in the code.

## 📚 Technologies Used

- **Next.js**: React framework for server-side rendering.
- **React**: JavaScript library for building user interfaces.
- **Typescript**: Superset of JavaScript that adds static typing to the project.
- **SASS**: CSS pre-processor used for styling the application.
- **Bootstrap/React-Bootstrap**: Quick, responsive styling.
- **React-Icons**: For icon components used throughout the app.
- **React-Tooltip**: For tooltips across the user interface.
- **bcrypt**: Password hashing for secure user data storage.
- **jsonwebtoken (JWT)**: Secure authentication using JSON Web Tokens.
- **RAWG API**: Source of game data.
- **SQLite**: Simple, efficient database for storing lists and user data.