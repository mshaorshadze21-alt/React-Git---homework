function BookItem({ book, onDelete, onEdit }) {
  return (
    <div className={book.read ? "border-3 border-green-800 p-5 rounded-2xl" : "rounded-2xl p-5 border-3 border-red-800"}>
      <h3>{book.title}</h3>

      <p>
        <strong>ავტორი:</strong> {book.author}
      </p>

      <p>
        <strong>წელი:</strong> {book.year}
      </p>

      <p>
        <strong>ჟანრი:</strong> {book.genre}
      </p>

      <p>
        <strong>სტატუსი:</strong>{" "}
        {book.read ? " წაკითხული" : " წასაკითხი"}
      </p>

      <div className="flex justify-between gap-4">
        <button onClick={() => onEdit(book)} className="border border-green-500 rounded-2xl p-2">
          რედაქტირება
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(book.id)}
           className="border border-red-500 rounded-2xl p-2"
        >
          წაშლა
        </button>
      </div>
    </div>
  );
}

export default BookItem;