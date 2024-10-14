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
        "https://in-sekuritas.com",
        "https://investindo-uploader-express.vercel.app"
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

app.use((req, res, next) => {
  const allowedDNS = "in-sekuritas.com";
  const host = req.get("host");
  const ip =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  console.log(ip);
  if (
    ip === "103.109.193.242" ||
    host.includes(allowedDNS) ||
    host.includes("localhost") || ip === '202.72.220.58'
  ) {
    next();
  } else {
    res
      .status(403)
      .send(
        "Forbidden Access: unknown user, only author can access this website!"
      ); // Deny access
  }
});

// Run and render UI to /
app.get("/", (req, res) => {
  res.send("Granted Access to the website!");
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
