import BookItem from "./BookItem";

function BookList({ books, onDelete, onEdit }) {
  if (books.length === 0) {
    return (
      <div className="">
        <h3> წიგნები ჯერ არ დაგიმატებიათ</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default BookList;