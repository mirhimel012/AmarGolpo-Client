import Swal from "sweetalert2";

const AddBook = () => {
  const handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target;

    // Collect all fields
    const newBook = {
      name: form.book_name.value,
      author: form.author_name.value,
      category: form.category.value,
      mood: form.mood.value || "",              // new field
      readingTime: form.reading_time.value || "", // new field
      rating: form.rating.value || 0,
      photo: form.photo.value,
      message: form.message.value,
      likes: 0,                                 // default
      createdAt: new Date().toISOString(),      // default
    };

    console.log(newBook);

    // Send to server
    fetch("https://amar-golpo-server.vercel.app/books", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Story Added Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-8 text-center">
          Share Your Story
        </h2>

        <form onSubmit={handleAddBook} className="space-y-6">
          {/* Name & Author */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                name="book_name"
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Story Title
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                name="author_name"
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Your Name
              </label>
            </div>
          </div>

          {/* Category & Mood */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                name="category"
                required
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Category (Genre)
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                name="mood"
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Mood (Optional)
              </label>
            </div>
          </div>

          {/* Reading Time & Rating */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                name="reading_time"
                placeholder="e.g., 2 min read"
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Reading Time
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
                Rating (Optional)
              </label>
            </div>
          </div>

          {/* Photo URL */}
          <div className="relative">
            <input
              type="url"
              name="photo"
              required
              className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder=" "
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
              Photo URL
            </label>
          </div>

          {/* Story */}
          <div className="relative">
            <textarea
              name="message"
              rows="6"
              required
              className="peer w-full px-4 pt-6 pb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder=" "
            ></textarea>
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-purple-600">
              Your Story
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Share Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
