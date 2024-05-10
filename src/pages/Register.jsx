import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="m-10">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    <div className="hidden bg-cover lg:block lg:w-1/2"><img className="h-full" src="https://i.ibb.co/2g7Nxq3/books-2596809-1920.jpg" alt="" /></div>
    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center mx-auto">
            <img className="w-16" src="https://i.ibb.co/4dDWk3Q/books.png" alt=""/>
        </div>

        <div className="">
            <h2 className="text-3xl text-black text-center font-semibold">Register Here!</h2>
        </div>

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>

        <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input name="name" type="text" placeholder="Your Name" className="input input-bordered"  />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="email" className="input input-bordered"  />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Url</span>
          </label>
          <input name="imageurl" type="text" placeholder="Image Url" className="input input-bordered" />
          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type="password" placeholder="password" className="input input-bordered" />
        </div>
        <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Register
            </button>
        </div>
        <div className="text-center mt-2">      
	        <p className="text-black">Already have an account? Please <Link className="text-lime-600 font-bold" to="/login">Login</Link></p>
        </div>
      </form>

    </div>
</div>
        </div>
    );
};

export default Register;