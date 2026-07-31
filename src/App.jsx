import { useEffect, useState, useMemo } from 'react'
import BookForm from './components/BookForm'
import BookItem from './components/BookItem'
import BookList from './components/BookList'
import Filters from './components/Filters'
import Stats from './components/Stats'


function App() {
  const[books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved? JSON.parse(saved) : []
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books]);

  function addBook(book){
    setBooks([...books, book])
  };

  function updateBook(updatedBook){
    setBooks(
      books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );

    setEditingBook(null);
  };

  function deleteBook(id){
    const confirmDelete = window.confirm(
      "ნამდვილად გსურთ წიგნის წაშლა?"
    );

    if (!confirmDelete) return;

    setBooks(books.filter((book) => book.id !== id));
  };


  const filteredBooks = useMemo(() => {
    let result = books.filter((book) => {
      const text =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      if (!text) return false;

      if (filter === "read") return book.read;
      if (filter === "unread") return !book.read;

      return true;
    });

    if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "year") {
      result.sort((a, b) => a.year - b.year);
    }

    return result;
  }, [books, search, filter, sortBy]);


  
  return (
    <div className='flex flex-col justify-center items-center gap-10 p-10'>
      <h1 className='text-3xl font-bold'>ბიბლიოთეკა</h1>

      <Stats books={books} />

      <BookForm
        addBook={addBook}
        updateBook={updateBook}
        editingBook={editingBook}
        cancelEdit={() => setEditingBook(null)}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <BookList
        books={filteredBooks}
        onDelete={deleteBook}
        onEdit={setEditingBook}
      />

    </div>
  )
}

export default App
