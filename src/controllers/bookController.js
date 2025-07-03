import bookModel from "../models/bookModel.js";
import { readJson,writeJson } from "../utils/filehelper.js";
import { v4 as uuidv4 } from 'uuid';


const BOOK_FILE="books.json"

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
      return res
        .status(400)
        .json({ Success: false, message: "All field required" });
    }
    const books=await readJson(BOOK_FILE);
    const newBook={id:uuidv4(),title,author,genre,publishedYear,userId:req.user.id};
    books.push(newBook);
    await writeJson(BOOK_FILE,books);
    res
      .status(201)
      .json({ Success: true, message: "Book created", book: newBook });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await readJson(BOOK_FILE);
    res.status(200).json({ Success: true, message: "All books", books});
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await readJson(BOOK_FILE);
    const book=books.find(b=>b.id===id);
    if (!book) {
      return res
        .status(404)
        .json({ Success: false, message: "Book not found!" });
    }
    res.status(200).json({ Success: true, book });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const books=await readJson(BOOK_FILE);
    const index =books.findIndex(b=>b.id===id);
    if (index===-1) {
      return res
        .status(404)
        .json({ Success: false, message: "Book not found!" });
    }
    if (books[index].userId !== req.user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this book",
        });
    }
   books[index]={...books[index],...req.body};
   await writeJson(BOOK_FILE,books);
    res.status(200).json({ success: true, message: "Book updated", book:books[index] });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};

export const deleteBook=async(req,res)=>{
    try{
      const {id}=req.params;
      const books=await readJson(BOOK_FILE);
      const index=books.findIndex(b=>b.id===id && b.userId===req.user.id);
      if(index==-1){
        return res.status(404).json({Success:false,message:"book not found or not authorized!"});
      }
      books.splice(index,1);
      await writeJson(BOOK_FILE,books);
      res.status(200).json({Success:true,message:"Book deleted Successfully"})
    }catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
    }
}

export const searchBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    if (!genre) {
      return res.status(400).json({
        Success: false,
        message: "Genre is required in query param"
      });
    }

    const books = await readJson(BOOK_FILE);
    const filtered=books.filter(b=>b.genre.toLowerCase()===genre.toLowerCase())
    res.status(200).json({
      Success: true,
      message: `Books of genre: ${genre}`,
      books:filtered
    });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};

export const getPaginatedBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await readJson(BOOK_FILE);
    const paginated = books.slice(skip, skip + limit);

    res.status(200).json({
      Success: true,
      page,
      limit,
      total: books.length,
      books: paginated
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Success: false, message: "Internal Server Error" });
  }
};
