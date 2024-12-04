import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * rewardTokenStorage - A key-value datastructure used to store reward tokens and their ownership.
 * {@link StableBTreeMap} ensures data durability and quick access across canister upgrades.
 */

/**
 * Class representing a training session.
 */
class TrainingSession {
  id: string;
  title: string;
  description: string;
  rewardToken: number;
  createdAt: Date;
  updatedAt: Date | null;
}

/**
 * Class representing a user and their token balance.
 */
class User {
  id: string;
  name: string;
  tokenBalance: number;
  createdAt: Date;
}

const sessionStorage = StableBTreeMap<string, TrainingSession>(0);
const userStorage = StableBTreeMap<string, User>(1);

const app = express();
app.use(express.json());

// Create a new training session
app.post("/sessions", (req, res) => {
  const session: TrainingSession = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    ...req.body,
  };
  sessionStorage.insert(session.id, session);
  res.json(session);
});

// Retrieve all training sessions
app.get("/sessions", (req, res) => {
  res.json(sessionStorage.values());
});

// Retrieve a specific training session
app.get("/sessions/:id", (req, res) => {
  const sessionId = req.params.id;
  const session = sessionStorage.get(sessionId);
  if (!session) {
    res.status(404).send(`Session with id=${sessionId} not found`);
  } else {
    res.json(session);
  }
});

// Update a training session
app.put("/sessions/:id", (req, res) => {
  const sessionId = req.params.id;
  const session = sessionStorage.get(sessionId);
  if (!session) {
    res.status(404).send(`Session with id=${sessionId} not found`);
  } else {
    const updatedSession = {
      ...session,
      ...req.body,
      updatedAt: getCurrentDate(),
    };
    sessionStorage.insert(session.id, updatedSession);
    res.json(updatedSession);
  }
});

// Delete a training session
app.delete("/sessions/:id", (req, res) => {
  const sessionId = req.params.id;
  const deletedSession = sessionStorage.remove(sessionId);
  if (!deletedSession) {
    res.status(404).send(`Session with id=${sessionId} not found`);
  } else {
    res.json(deletedSession);
  }
});

// Enroll a user and reward tokens
app.post("/enroll/:sessionId/:userId", (req, res) => {
  const { sessionId, userId } = req.params;
  const session = sessionStorage.get(sessionId);
  const user = userStorage.get(userId);

  if (!session) {
    res.status(404).send(`Session with id=${sessionId} not found`);
    return;
  }
  if (!user) {
    res.status(404).send(`User with id=${userId} not found`);
    return;
  }

  user.tokenBalance += session.rewardToken;
  userStorage.insert(user.id, user);

  res.json({ message: "User enrolled and rewarded", user });
});

// Create a new user
app.post("/users", (req, res) => {
  const user: User = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    tokenBalance: 0,
    ...req.body,
  };
  userStorage.insert(user.id, user);
  res.json(user);
});

app.get("/users", (req, res) => {
  res.json(userStorage.values());
});

app.listen();

function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}
