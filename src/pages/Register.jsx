import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const {createUser, updateUserProfile} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const[registerError, setRegisterError] = useState('');
  const[success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // navigation system
  const navigate = useNavigate()
  const from = '/';

  const onSubmit = (data) => {
    const{email, password, image, fullName} = data
    console.log(data)

    // Password verification
     // reset error and success
     setRegisterError('');
     setSuccess('');

     // password must be up to 6 character
     if(password.length < 6){
         setRegisterError('Password should be at least 6 characters')
         setTimeout(() => {
             setRegisterError('');
         }, 4000);
         return;
     }
     // Password should have at least one uppercase character
     else if(!/[A-Z]/.test(password)){
         setRegisterError('Password should have at least one uppercase character')
         setTimeout(() => {
             setRegisterError('');
         }, 4000);
         return;
     }
     // Password should have at least one lowercase character
     else if(!/[a-z]/.test(password)){
         setRegisterError('Password should have at least one Lowercase character')
         setTimeout(() => {
             setRegisterError('');
         }, 4000);
         return;
     }

     // create user and update profile
    createUser(email, password)
      .then(() => {
        updateUserProfile(fullName, image)
        .then(()=>{
            navigate(from);
        })
      })
      .catch(error => {
        // Handle registration errors
        setRegisterError("Registration failed. Please try again.");
        setTimeout(() => {
          setRegisterError('');
      }, 4000);
        console.error(error);
      });
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input name="name" type="text" placeholder="Your Name" className="input input-bordered" {...register("fullName", { required: true })} />
          {errors.fullName && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name="email" type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Url</span>
          </label>
          <input name="imageurl" type="text" placeholder="Image Url" className="input input-bordered" {...register("image")} />
          
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
          <span className="absolute mt-14 ml-64" onClick={()=> setShowPassword(!showPassword)}>
	            {
	              showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
	            }
            </span>
          {errors.password && <span className="text-red-500">This field is required</span>}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
        <div className="text-center mt-2">      
	        <p>Already have an account? Please <Link className="text-lime-600 font-bold" to="/login">Login</Link></p>
        </div>
      </form>
      {/* Success and Error message */}
      {
        registerError && <div className="toast toast-center toast-middle bg-red-500 rounded-3xl">
        <div className="alert alert-info">
          <span>{registerError}</span>
        </div>
      </div>
      }
      
      {
        success && <div className="toast toast-center toast-middle bg-blue-500 rounded-3xl">
        <div className="alert alert-info">
          <span>{success}</span>
        </div>
      </div>
      }

    </div>
</div>
        </div>
    );
};

export default Register;