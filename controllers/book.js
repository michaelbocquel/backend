const Book = require("../models/Book");

exports.getAllBooks = (req, res, next) => {
	Book.find()
		.then((books) => {
			res.status(200).json(books);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.getOneBook = (req, res, next) => {
	Book.findOne({
		_id: req.params.id,
	})
		.then((book) => {
			res.status(200).json(book);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.getBestRatedBooks = (req, res, next) => {
	Book.findOne({
		_id: req.params.id,
	})
		.then((book) => {
			res.status(200).json(book);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.postOneBook = (req, res, next) => {
	const book = new Book({
		userId: req.body.userId,
		title: req.body.title,
		author: req.body.author,
		year: req.body.year,
		genre: req.body.genre,
		imageUrl: req.body.imageUrl,
	});
	book
		.save()
		.then(() => {
			res.status(201).json({
				message: "Book saved successfully!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.updateOneBook = (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({
				message: "Deleted!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.deleteOneBook = (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({
				message: "Deleted!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.rateOneBook = (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(() => {
			res.status(200).json({
				message: "Deleted!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
