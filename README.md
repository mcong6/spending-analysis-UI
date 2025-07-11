# Spending Analysis UI

## Overview

This project is a Next.js application designed to help users analyze and manage their personal spending. It provides a user-friendly interface for visualizing financial transactions, uploading data, and gaining insights into spending habits.

## Features

- **User Authentication:** Secure user login and session management powered by NextAuth.js.
- **Interactive Dashboard:** A comprehensive overview of spending, featuring various charts and data summaries.
- **Transaction Management:** Functionality to view, add, and potentially edit/delete financial transactions.
- **Data Import:** Supports uploading transaction data, likely via CSV files, using Papaparse.
- **Rich Data Visualization:** Utilizes multiple charting libraries (Chart.js, Recharts, MUI X-Charts) to present spending patterns effectively.
- **Responsive Design:** Built with Tailwind CSS and Material UI components for a modern and adaptive user experience.

## Technologies Used

This application is built using a modern web development stack:

- **Framework:** [Next.js](https://nextjs.org/) (React Framework)
- **Frontend Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) and [Material UI](https://mui.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Data Fetching:** [Axios](https://axios-http.com/) and [SWR](https://swr.vercel.app/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Charting Libraries:** [Chart.js](https://www.chartjs.org/), [React-Chartjs-2](https://react-chartjs-2.js.org/), [Recharts](https://recharts.org/en-US/), and [@mui/x-charts](https://mui.com/x/react-charts/)
- **CSV Parsing:** [Papaparse](https://www.papaparse.com/)
- **Date Management:** [Day.js](https://day.js.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- 
### Installation

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### Building for Production

To create an optimized build of the application for deployment:

```bash
npm run build
```

### Running in Production Mode

After building, you can run the application in production mode:

```bash
npm run start
```
