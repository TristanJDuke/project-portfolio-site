const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const messagesFile = path.join(__dirname, "messages.json");

// Ensure file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, "[]");
}

// POST /messages – store a new message
app.post("/messages", (req, res) => {
  const newMessage = req.body;

  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read messages." });

    const messages = JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to save message." });
      res.status(201).json({ message: "Message saved!" });
    });
  });
});

// GET /messages – return all messages
app.get("/messages", (req, res) => {
  fs.readFile(messagesFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load messages." });

    try {
      const messages = JSON.parse(data);
      res.json(messages);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format." });
    }
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});