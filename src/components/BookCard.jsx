import { Link } from "react-router-dom";
// import "animate.css";
// import Swal from "sweetalert2";

const BookCard = ({ book, books, setbooks }) => {
  const {
    name,
    author,
    category,
    rating,
    photo,
    quantity,
    message,
  } = book;

  return (
    <div className="border rounded-2xl p-4 m-2 hover:scale-105 border-opacity-30 border-primary hover:border-secondary  ">
{/* to={`/blog/${blog.bookId}`}  */}
            <Link className="max-w-sm mx-auto dark:bg-gray-50">
                <img role="presentation" className="object-cover w-full rounded h-screen  dark:bg-gray-500" src={photo} />
                
                <div className="p-6 space-y-2">
                    <h3 className="text-3xl font-bold">{name}</h3>
                    <h3 className="text-lg font-semibold">By: {author}</h3>
                    <h5 className="border-b-2 m-2 border-dashed mx-auto"></h5>

                    <div className="flex justify-between text-lg">
                        <span><span className="font-semibold">Category: </span>{category}</span>
                        <div className="flex items-center gap-2">
                            <span>{rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
                
        </div>
  );
};

export default BookCard;