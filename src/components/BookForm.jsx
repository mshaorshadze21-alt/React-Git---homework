import { useEffect, useState } from "react";

function BookForm({
  addBook,
  updateBook,
  editingBook,
  cancelEdit,
}) {
  const currentYear = new Date().getFullYear();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("რომანი");
  const [read, setRead] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
      setGenre(editingBook.genre);
      setRead(editingBook.read);
    } else {
      clearForm();
    }
  }, [editingBook]);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("რომანი");
    setRead(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("შეიყვანეთ სათაური");
      return;
    }

    if (!author.trim()) {
      setError("შეიყვანეთ ავტორი");
      return;
    }

    if (
      year === "" ||
      Number(year) < 1000 ||
      Number(year) > currentYear
    ) {
      setError(`წელი უნდა იყოს 1000 - ${currentYear}`);
      return;
    }

    setError("");

    const book = {
      id: editingBook ? editingBook.id : crypto.randomUUID(),
      title,
      author,
      year: Number(year),
      genre,
      read,
    };

    if (editingBook) {
      updateBook(book);
    } else {
      addBook(book);
    }

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start gap-4 border-2 border-amber-600 p-4">

      <h2 className="font-bold text-xl text-black">
        {editingBook ? "წიგნის რედაქტირება" : "ახალი წიგნის დამატება"}
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <input
        type="text"
        placeholder="სათაური"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-amber-500 rounded-md p-2"
      />

      <input
        type="text"
        placeholder="ავტორი"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border border-amber-500 rounded-md p-2"
      />

      <input
        type="number"
        placeholder="გამოცემის წელი"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border border-amber-500 rounded-md p-2"
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border border-amber-500 rounded-md p-2"
      >
        <option>რომანი</option>
        <option>ფანტასტიკა</option>
        <option>დეტექტივი</option>
        <option>ბიოგრაფია</option>
        <option>სხვა</option>
      </select>

      <label className="flex gap-2 border border-amber-500 rounded-md p-2 col-span-2">
        <input
          type="checkbox"
          checked={read}
          onChange={(e) => setRead(e.target.checked)}
        />
        წაკითხულია
      </label>

      <div className="border border-amber-500 rounded-md p-2 col-span-2">
        <button type="submit" className="">
          {editingBook ? "შენახვა" : "დამატება"}
        </button>

        {editingBook && (
          <button
            type="button"
            onClick={() => {
              cancelEdit();
              clearForm();
            }}
            
          >
            გაუქმება
          </button>
        )}
      </div>
      </div>

    </form>
  );
}

export default BookForm;