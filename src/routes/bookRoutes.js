import express from "express"
import { addBook, deleteBook, getAllBooks, getBookById, updateBook,searchBooksByGenre,getPaginatedBooks } from "../controllers/bookController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post('/books',authMiddleware,addBook);
router.get('/search', authMiddleware, searchBooksByGenre);
router.get('/books',authMiddleware,getAllBooks);
router.get('/books/:id',authMiddleware,getBookById);
router.put('/books/:id',authMiddleware,updateBook);
router.delete('/books/:id',authMiddleware,deleteBook);
router.get('/paginated', authMiddleware, getPaginatedBooks);


export default router;