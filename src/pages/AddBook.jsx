import Swal from "sweetalert2";
const AddBook = () => {
    const handleAddBook = (event) => {
        event.preventDefault();
    
        const form = event.target;
    
        const name = form.book_name.value;
        const author = form.author_name.value;
        const category = form.category.value;
        const rating = form.rating.value;
        const photo = form.photo.value;
        const quantity = form.quantity.value;
        const message = form.querySelector("#message").value;
    
        const newBook = {
          name,
          author,
          category,
          rating,
          photo,
          quantity,
          message,
        };
        console.log(newBook);
    
        // send data to the server
        fetch("http://localhost:5000/book", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newBook),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Book Added Successfully",
                icon: "success",
                confirmButtonText: "Cool",
              });
            }
          });
      };

    return (
        <div className="bg-[#eeedf3] p-24 -mt-12">
      <h2 className="text-xl font-extrabold text-purple-600 md:text-3xl">
        Add a Book
      </h2>
      <form onSubmit={handleAddBook}>
        {/* book name and author name*/}
        <div className="md:flex mb-6">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-medium">Book Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="book_name"
                placeholder="Book Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text font-medium">Author Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="author_name"
                placeholder="Author Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* catagory and ratting */}
        <div className="md:flex mb-6">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text font-medium">Rating</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="rating"
                placeholder="Rating"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* image and quantity */}
        <div className="md:flex mb-6">
        <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text font-medium">
              Quantity
              </span>
            </label>
            <label className="input-group">
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
        {/* short description */}
        <form id="form">
          <div className="mb-6">
            <div className="form-control w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Short Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
          </div>
        </form>
               
        <input
          type="submit"
          value="Add Book"
          className="btn text-xl w-full bg-slate-500 hover:bg-green-600 text-white"
        />
      </form>
    </div>
    );
};

export default AddBook;