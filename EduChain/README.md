# EduChain

EduChain is a Web3-based platform for online training, enabling users to participate in courses and earn reward tokens upon completion. Built on the Internet Computer, it offers transparency, decentralization, and tokenized incentives.

## Features

- Create and manage training sessions
- Reward participants with tokens
- User management with token balance tracking
- Decentralized data persistence using StableBTreeMap

## Installation

### Prerequisites

- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/educhain.git
    cd educhain
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the DFX project:
    ```bash
    dfx start
    ```

4. Deploy the canister:
    ```bash
    dfx deploy
    ```

5. Run the application:
    ```bash
    npm run dev
    ```

## API Endpoints

- **POST** `/sessions`: Create a new training session
- **GET** `/sessions`: Retrieve all training sessions
- **GET** `/sessions/:id`: Retrieve a session by ID
- **PUT** `/sessions/:id`: Update a session by ID
- **DELETE** `/sessions/:id`: Delete a session by ID
- **POST** `/users`: Create a new user
- **POST** `/enroll/:sessionId/:userId`: Enroll a user and reward tokens
- **GET** `/users`: Retrieve all users

## License

This project is licensed under the MIT License.
