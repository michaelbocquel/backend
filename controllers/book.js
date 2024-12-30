const fs = require("fs");

const Book = require("../models/Book");

exports.getAllBooks = (req, res) => {
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

exports.getOneBook = (req, res) => {
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

exports.getBestRatedBooks = (req, res) => {
	Book.find()
		.sort({ averageRating: -1 })
		.limit(3)
		.then((books) => {
			res.status(200).json(books);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

exports.postOneBook = (req, res) => {
	const bookObject = JSON.parse(req.body.book);
	delete bookObject._id;
	delete bookObject._userId;
	const book = new Book({
		...bookObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
	});

	book
		.save()
		.then(() => {
			res.status(201).json({ message: "Livre enregistré !" });
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

exports.updateOneBook = (req, res) => {
	const bookObject = req.file
		? {
				...JSON.parse(req.body.book),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	delete bookObject._userId;
	Book.findOne({ _id: req.params.id })
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(403).json({ message: "unauthorized request" });
			} else if (req.file) {
				const filename = book.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					Book.updateOne(
						{ _id: req.params.id },
						{ ...bookObject, _id: req.params.id }
					)
						.then(() => res.status(200).json({ message: "Objet modifié!" }))
						.catch((error) => res.status(401).json({ error }));
				});
			} else {
				Book.updateOne(
					{ _id: req.params.id },
					{ ...bookObject, _id: req.params.id }
				)
					.then(() => res.status(200).json({ message: "Objet modifié!" }))
					.catch((error) => res.status(401).json({ error }));
			}
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

exports.deleteOneBook = (req, res) => {
	Book.findOne({ _id: req.params.id })
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(403).json({ message: "unauthorized request" });
			} else {
				const filename = book.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					Book.deleteOne({ _id: req.params.id })
						.then(() => {
							res.status(200).json({ message: "Livre supprimé !" });
						})
						.catch((error) => res.status(401).json({ error }));
				});
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

exports.rateOneBook = (req, res) => {
	Book.findOne({ _id: req.params.id }).then((book) => {
		const bookRatings = book.ratings;
		const newRating = { userId: req.body.userId, grade: req.body.rating };
		bookRatings.push(newRating);
		book.averageRating = computeAverageRating(bookRatings);
		book.save();
	});
};

function computeAverageRating(ratings) {
	const sumOfGrades = ratings.reduce((sum, rating) => sum + rating.grade, 0);
	return (sumOfGrades / ratings.length).toFixed(2);
}
