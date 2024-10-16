const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

// Use CORS middleware first
app.use(
  cors({
    origin: (origin, callback) => {
      // Allowed origins (local development and domain)
      const allowedOrigins = [
        "http://localhost:5173",
        "https://oktavia-uploader-express.vercel.app"
      ];

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Block the request
      }
    },
  })
);


// Run and render UI to /
app.get("/", (req, res) => {
  res.send("Granted Access to the website!");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
