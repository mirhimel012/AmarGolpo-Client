import Swal from "sweetalert2";

const AddBook = () => {
  const handleAddBook = (event) => {
    event.preventDefault();

    const form = event.target;

    const newBook = {
      name: form.book_name.value,
      author: form.author_name.value,
      category: form.category.value,
      rating: form.rating.value,
      photo: form.photo.value,
      quantity: form.quantity.value,
      message: form.querySelector("#message").value,
    };

    console.log(newBook);

    // send data to server
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
            text: "Book Added Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-8 text-center">
          Add a New Book
        </h2>

        <form onSubmit={handleAddBook} className="space-y-6">
          {/* Book Name & Author */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                name="book_name"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Book Name
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                name="author_name"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Author Name
              </label>
            </div>
          </div>

          {/* Category & Rating */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="text"
                name="category"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Category
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Rating
              </label>
            </div>
          </div>

          {/* Photo URL & Quantity */}
          <div className="md:flex gap-6">
            <div className="flex-1 relative">
              <input
                type="url"
                name="photo"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Photo URL
              </label>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                name="quantity"
                min="1"
                required
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
                Quantity
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder=" "
            ></textarea>
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-purple-600 peer-focus:text-sm">
              Short Description
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
