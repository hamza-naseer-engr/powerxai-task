# PowerXAI Software Engineer Task

This project is a Node.js application using TypeScript and Express, designed to handle data integration by receiving and storing plaintext data, and retrieving it on-demand later.

The task description can be found online at: [PowerXAI Software Engineer Task](https://powerxai.notion.site/Software-Engineer-c2d8095970d94e78a39f1abd86533939).

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/hamza-naseer-engr/powerxai-task.git
    cd powerxai-task
    ```

2. Install the project dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm run serve
    ```

2. The application will be running at [http://localhost:3000](http://localhost:3000).

### API Endpoints

#### POST /data

This endpoint receives plaintext data, parses it, and stores it in the database.

- **Request**:
    ```plaintext
    POST /data
    Content-Type: text/plain

    1649941817 Voltage 1.34
    1649941818 Voltage 1.35
    1649941817 Current 12.0
    1649941818 Current 14.0
    ```

- **Response**:
    ```json
    {
      "success": true
    }
    ```

#### GET /data

This endpoint retrieves data within a specified date range, including an average power reading for each day.

- **Request**:
    ```plaintext
    GET /data?from=2022-01-01&to=2022-01-03
    ```

- **Response**:
    ```json
    [
      {
        "time": "2022-04-14T13:10:17.000Z",
        "name": "Voltage",
        "value":
      }
    ]
    ```
