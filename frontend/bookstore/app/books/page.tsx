"use client";

import Button from "antd/es/button";
import { Books } from "../components/Books"
import { useEffect, useState } from "react";
import { BookRequest, createBook, getAllBooks, updateBook, deleteBook } from "../services/books";
// import Title from "antd/es/typography/Title";
import { Typography } from "antd";
const { Title } = Typography;
import { CreateUpdateBook, Mode} from "../components/CreateUpdateBook";

export default function BooksPage() {
    const defaultValues = {
      title: "",
      description: "",
      price: 1,
    } as Book;

    const [values, setValues] = useState<Book>(defaultValues);

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    const handleCreateBook = async (request: BookRequest) =>{
      await createBook(request);
      closeModal;

      const books = await getAllBooks();
      setBooks(books);
    }

    const handleUpdateBook = async (id: string, request: BookRequest) =>{
      await updateBook(id, request);
      closeModal;

      const books = await getAllBooks();
      setBooks(books);
    }

    const handleDeleteBook = async (id: string) =>{
      await deleteBook(id);

      const books = await getAllBooks();
      setBooks(books);
    }

    const openModal =() => {  
      setIsModalOpen(true);
    }

    const closeModal =() => {
      setValues(defaultValues);
      setIsModalOpen(false);
    }

    const openEditModel = (book: Book) => {
      setMode(Mode.Edit);
      setValues(book);
      setIsModalOpen(true);
    }

    useEffect(() => {
        const getBooks =  async () => {
            const books = await getAllBooks()
            setLoading(false);
            setBooks(books);
        };

        getBooks();
    }, [])

  return (
    <div>
        <Button
            type="primary"
            style={{ marginTop: "30px" }} 
            onClick={openModal} 
            size = "large"
        >
            Добавить книгу
        </Button>
        <CreateUpdateBook 
            mode={mode} 
            values = {values} 
            isModalOpen = {isModalOpen} 
            handleCreate={handleCreateBook} 
            handleUpdate={handleUpdateBook} 
            handleCancel={closeModal}
        />
        {loading ?<Title>Loading...</Title> : <Books books={books} handleOpen={openEditModel} handleDelete={handleDeleteBook}/>}
    </div>
  )
}
