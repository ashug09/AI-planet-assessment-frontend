Certainly! Here is the updated README with the link to the backend code included:

---

# PDF Query Bot

This project is a sophisticated bot that allows users to query PDF documents using Gemini AI and LangChain. The bot's frontend is built with Next.js and TailwindCSS, while the backend is powered by FastAPI. Chat history is stored in MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Link to Backend Code](#links)

## Features

- **Query PDFs**: Upload a PDF and query its content using natural language.
- **Real-time Chat**: FastAPI backend to handle real-time chat interactions.
- **Persistent Chat History**: Store and retrieve recent chat histories using MongoDB.
- **AI-Powered**: Utilize Gemini AI and LangChain for processing and understanding PDF content.

## Installation

### Prerequisites

- Node.js and npm
- Python and pip
- MongoDB

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pdf-query-bot.git
   cd pdf-query-bot/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory and add your environment variables:
   ```plaintext
   NEXT_PUBLIC_BE_URI=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone https://github.com/ashug09/AI-planet-assessment-backend.git
   cd AI-planet-assessment-backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables. Create a `.env` file in the `backend` directory and add your environment variables:
   ```plaintext
   MONGODB_URI=mongodb://localhost:27017
   ```

5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

## Usage

1. **Upload PDF**: Visit the frontend in your browser (typically at `http://localhost:3000`) and upload a PDF file.
2. **Ask Questions**: Use the chat interface to ask questions about the uploaded PDF.
3. **View Responses**: The bot will respond with relevant information extracted from the PDF.

## Project Structure

```plaintext
pdf-query-bot/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── routes.py
│   ├── utils.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   ├── pages/
│   ├── styles/
│   ├── .env.local
│   └── package.json
└── README.md
```

## Technologies Used

### Frontend

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

### Backend

- [FastAPI](https://fastapi.tiangolo.com/)
- [MongoDB](https://www.mongodb.com/)
- [Uvicorn](https://www.uvicorn.org/)

### AI & Language Processing

- [Gemini AI](https://gemini.com/)
- [LangChain](https://langchain.com/)

## Links

- [Backend Code](https://github.com/ashug09/AI-planet-assessment-backend)

---

Feel free to update the links, paths, and descriptions to match your project's specifics.
