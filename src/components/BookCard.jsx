import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const {
    _id,
    name,
    author,
    category,
    rating,
    photo,
    message,       // story preview
    mood,          // new field
    readingTime,   // new field
    likes,         // new field
    createdAt,     // new field
  } = book;

  // Preview text for long stories
  const preview = message?.length > 180 ? message.slice(0, 180) + "..." : message;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out flex flex-col">
      {/* Story Image */}
      <div className="h-64 w-full overflow-hidden rounded-t-2xl">
        <img
          src={photo}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Story Info */}
      <div className="p-5 flex flex-col justify-between flex-1">
        {/* Title and Author */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">By {author}</p>

          {/* Story preview */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
            {preview || "No story preview available."}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800">{category || "General"}</span>
            {mood && <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">{mood}</span>}
            {readingTime && <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">{readingTime}</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          {/* Likes and rating */}
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>❤️ {likes || 0}</span>
            {rating && <span>⭐ {rating}</span>}
            <span className="ml-2 text-gray-400 text-xs">{createdAt ? new Date(createdAt).toLocaleDateString() : "Recently Added"}</span>
          </div>

          {/* Read Story button */}
          <Link
            to={`/details/${_id}`}
            className="bg-gradient-to-r from-pink-500 to-red-400 hover:from-red-500 hover:to-pink-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Read Story →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
