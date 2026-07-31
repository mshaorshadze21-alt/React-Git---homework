const Stats = ({books}) => {

  const total = books.length;
  const read = books.filter((book) => book.read).length;
  const unread = total - read;

  return
   <div>
    <div>
        <h3>{total}</h3>
        <p>წიგნები</p>
    </div>
    <div>
        <h3>{read}</h3>
        <p>წაკითხული წიგნები</p>
    </div>
    <div>
        <h3>{unread}</h3>
        <p>წასაკითხი წიგნები</p>
    </div>
   </div>;
};

export default Stats;
