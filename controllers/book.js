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
			res.status(201).json({ message: "Objet enregistré !" });
		})
		.catch((error) => {
			res.status(400).json({ error });
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
