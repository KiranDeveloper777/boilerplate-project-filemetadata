const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Use memory storage (important for Railway)
const upload = multer({ storage: multer.memoryStorage() });

// Home route
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// File upload route
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
