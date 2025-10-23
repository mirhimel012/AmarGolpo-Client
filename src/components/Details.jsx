import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const Details = () => {
  const book = useLoaderData();
  const {
    _id,
    name,
    author,
    category,
    rating,
    photo,
    message,
    mood,
    readingTime,
    likes: initialLikes,
    createdAt,
  } = book;

  const [likes, setLikes] = useState(initialLikes || 0);

  const handleLike = () => setLikes(likes + 1);

  const handleShare = () => {
    const shareData = {
      title: name,
      text: `Check out this story by ${author}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(err => console.error(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Cover Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={photo}
            alt={`Cover of ${name} by ${author}`}
            className="rounded-3xl shadow-2xl max-h-[500px] w-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Story Info */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-700 mb-2">{name}</h1>
            <p className="text-lg font-semibold mb-1">By: {author}</p>
            <p className="text-sm text-gray-500 mb-4">
              Published: {createdAt ? new Date(createdAt).toLocaleDateString() : "Recently Added"}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Category: {category || "General"}</span>
              {mood && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Mood: {mood}</span>}
              {readingTime && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Reading: {readingTime}</span>}
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Rating: {rating || 0}</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Likes: {likes}</span>
            </div>

            {/* Story Content */}
            <div className="max-h-[500px] overflow-y-auto p-6 rounded-2xl shadow-inner bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 prose prose-lg dark:prose-invert leading-relaxed">
              <p>{message || "No story content available."}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleLike}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Like ❤️
            </button>
            <button
              onClick={handleShare}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Share 🔗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
