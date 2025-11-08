import { useLoaderData } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";
import axios from "axios";

const Details = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const DEFAULT_PHOTO = "https://i.ibb.co.com/4g7NVnDW/ahad.jpg";

  const {
    _id,
    name,
    author,
    category,
    rating: initialRating,
    photo,
    message,
    mood,
    readingTime,
    likes: initialLikes,
    comments: initialComments,
    ratings: initialRatings,
    createdAt,
  } = book;

  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [comments, setComments] = useState(Array.isArray(initialComments) ? initialComments : []);
  const [commentText, setCommentText] = useState("");
  const [ratings, setRatings] = useState(Array.isArray(initialRatings) ? initialRatings : []);
  const [userRating, setUserRating] = useState(() => {
    if (!user) return 0;
    const found = ratings.find((r) => r.userId === user.uid);
    return found ? found.rating : 0;
  });
  const [avgRating, setAvgRating] = useState(
    ratings.length
      ? (ratings.reduce((a, b) => a + (b.rating || b), 0) / ratings.length).toFixed(1)
      : initialRating || 0
  );

  const [fontSize, setFontSize] = useState("text-base");
  const [bgTheme, setBgTheme] = useState("bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100");

  const [analysisResult, setAnalysisResult] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const userLiked = user ? likes.includes(user.uid) : false;

  // ❤️ Like
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

  // 💬 Comment
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

  // ⭐ Rating System (Dynamic)
  const handleRating = async (ratingValue) => {
    if (!user) return alert("Please login to rate this story!");

    const res = await fetch(`https://amar-golpo-server.vercel.app/books/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ratingUpdate: { userId: user.uid, rating: ratingValue },
      }),
    });

    const data = await res.json();
    if (data?.avgRating) {
      setAvgRating(data.avgRating.toFixed(1));
    }

    // Update UI instantly
    const updatedRatings = [...ratings];
    const existingIndex = updatedRatings.findIndex((r) => r.userId === user.uid);
    if (existingIndex >= 0) updatedRatings[existingIndex].rating = ratingValue;
    else updatedRatings.push({ userId: user.uid, rating: ratingValue });

    setRatings(updatedRatings);
    setUserRating(ratingValue);
  };

  // 🧠 Analyze Story
  const handleAnalyzeStory = async () => {
    if (!message || !message.trim()) return alert("No story content to analyze!");

    setLoadingAnalysis(true);
    try {
      const response = await axios.post("http://localhost:5000/analyze-text", {
        text: message,
      });
      setAnalysisResult(response.data.analysis || "No analysis result.");
    } catch (error) {
      console.error(error);
      setAnalysisResult("Error analyzing the story.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Top Image */}
      <div className="flex justify-center mb-10">
        <img
          src={photo || DEFAULT_PHOTO}
          alt={name}
          className="rounded-3xl shadow-2xl max-h-[500px] w-full max-w-5xl object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT: Story */}
        <div className="md:w-2/3 flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold text-purple-700">{name}</h1>
          <p className="text-lg font-semibold">By: {author}</p>
          <p className="text-sm text-gray-500">
            Published: {createdAt ? new Date(createdAt).toLocaleDateString() : "Recently Added"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Category: {category || "General"}
            </span>
            {mood && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Mood: {mood}
              </span>
            )}
            {readingTime && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Reading: {readingTime}
              </span>
            )}
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Rating: {avgRating}/5
            </span>
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Your Rating:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleRating(num)}
                className={`text-2xl transition ${
                  num <= userRating ? "text-yellow-400" : "text-gray-400 hover:text-yellow-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Story Content with Reader Options */}
          <div className="flex flex-col space-y-4">
            {/* Reader Options Toolbar */}
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-700 dark:text-gray-800 font-bold">Font:</span>
                <button
                  onClick={() => setFontSize("text-sm")}
                  className={`px-3 py-1 rounded border transition ${
                    fontSize === "text-sm"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => setFontSize("text-base")}
                  className={`px-3 py-1 rounded border transition ${
                    fontSize === "text-base"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-400 dark:bg-gray-600 text-gray-900 dark:text-gray-100 border-gray-500 dark:border-gray-500 hover:bg-gray-500 dark:hover:bg-gray-500"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFontSize("text-lg")}
                  className={`px-3 py-1 rounded border transition ${
                    fontSize === "text-lg"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                >
                  Large
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-gray-700 dark:text-gray-800 font-bold">Theme:</span>
                <button
                  onClick={() =>
                    setBgTheme("bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100")
                  }
                  className={`px-3 py-1 rounded border transition ${
                    bgTheme === "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                >
                  Light/Dark
                </button>
                <button
                  onClick={() =>
                    setBgTheme(
                      "bg-[#e3f2fd] dark:bg-[#1e293b] text-[#1e293b] dark:text-[#e0f2fe]"
                    )
                  }
                  className={`px-3 py-1 rounded border transition ${
                    bgTheme === "bg-[#e3f2fd] dark:bg-[#1e293b] text-[#1e293b] dark:text-[#e0f2fe]"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                >
                  Calm Blue
                </button>
                <button
                  onClick={() =>
                    setBgTheme("bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-300")
                  }
                  className={`px-3 py-1 rounded border transition ${
                    bgTheme === "bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-300"
                      ? "bg-purple-500 text-white border-purple-600"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                >
                  Soft Night
                </button>
              </div>
            </div>

            {/* Story Content */}
            <div
              className={`relative overflow-y-auto p-8 rounded-3xl shadow-xl prose dark:prose-invert ${fontSize} leading-relaxed tracking-wide ${bgTheme} max-h-[500px] border border-gray-200 dark:border-gray-700`}
            >
              {message ? (
                message.split("\n").map((line, idx) => <p key={idx}>{line}</p>)
              ) : (
                <p className="italic text-gray-400 dark:text-gray-500">No story content available.</p>
              )}
            </div>

            {/* Analyze Story Section */}
            <div>
              <button
                onClick={handleAnalyzeStory}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl shadow-md transition-transform hover:scale-105 font-semibold mt-4"
              >
                {loadingAnalysis ? "Analyzing..." : "Analyze Story"}
              </button>

              {analysisResult && (
                <div className="mt-4 p-4 text-white bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700">
                  <pre className="whitespace-pre-wrap">{analysisResult}</pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Likes & Comments */}
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
            <h2 className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full text-2xl font-semibold shadow-lg text-center">
              Comments
            </h2>

            <div className="space-y-3 max-h-[500px] overflow-y-auto p-2">
              {comments.length ? (
                comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                    <p className="text-gray-800 dark:text-gray-200 mt-1">{c.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
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
                  className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
