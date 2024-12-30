const express = require("express");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

app.use(express.json());

const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

const mongoose = require("mongoose");

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zgl2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
	)
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

app.use("/api/auth", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
