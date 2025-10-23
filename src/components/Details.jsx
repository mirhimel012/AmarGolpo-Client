import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

const Details = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const DEFAULT_PHOTO = "https://i.ibb.co.com/4g7NVnDW/ahad.jpg";

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
    comments: initialComments,
    createdAt,
  } = book;

  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [comments, setComments] = useState(Array.isArray(initialComments) ? initialComments : []);
  const [commentText, setCommentText] = useState("");

  const userLiked = user ? likes.includes(user.uid) : false;

  const handleLike = async () => {
    if (!user) return alert("Please login to like this story!");
    if (userLiked) return;

    const updatedLikes = [...likes, user.uid];
    setLikes(updatedLikes);

    await fetch(`https://amar-golpo-server.vercel.app/books/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedLikes }),
    });
  };

  const handleComment = async () => {
    if (!user) return alert("Please login to comment!");
    if (!commentText.trim()) return;

    const newComment = {
      userId: user.uid,
      name: user.displayName || "Anonymous",
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setCommentText("");

    await fetch(`https://amar-golpo-server.vercel.app/books/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: updatedComments }),
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Top Cover Image */}
      <div className="flex justify-center mb-10">
  <img
    src={photo || DEFAULT_PHOTO}
    alt={name}
    className="rounded-3xl shadow-2xl max-h-[500px] w-full max-w-5xl object-cover hover:scale-105 transition-transform duration-500"
  />
</div>


      {/* Bottom Section: two sides */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Book reading / info */}
        <div className="md:w-2/3 flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold text-purple-700">{name}</h1>
          <p className="text-lg font-semibold">By: {author}</p>
          <p className="text-sm text-gray-500">
            Published: {createdAt ? new Date(createdAt).toLocaleDateString() : "Recently Added"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Category: {category || "General"}</span>
            {mood && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Mood: {mood}</span>}
            {readingTime && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Reading: {readingTime}</span>}
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Rating: {rating || 0}</span>
          </div>

          {/* Story Content */}
          <div className="overflow-y-auto p-6 rounded-2xl shadow-inner bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 prose prose-lg dark:prose-invert leading-relaxed max-h-[500px]">
            <p>{message || "No story content available."}</p>
          </div>
        </div>

        {/* Right side: Likes and Comments */}
        <div className="md:w-1/3 flex flex-col space-y-6">
          {/* Like & Share */}
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLike}
              disabled={userLiked}
              className={`px-6 py-3 rounded-2xl shadow-md transition-transform hover:scale-105 text-white font-semibold ${
                userLiked ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Like ❤️ {likes.length}
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md transition-transform hover:scale-105 font-semibold"
            >
              Share 🔗
            </button>
          </div>

          {/* Comments */}
          <div className="flex flex-col gap-3">
            <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-3 rounded-full text-2xl font-semibold shadow-lg text-center transition-transform hover:scale-105">
              Comments
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {comments.length ? (
                comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">{c.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {user && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-300"
                />
                <button
                  onClick={handleComment}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md transition-transform hover:scale-105 font-semibold"
                >
                  Post
                </button>
              </div>
            )}

            {!user && <p className="text-gray-500 mt-2">Login to post a comment</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
