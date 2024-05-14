import { useLoaderData } from "react-router-dom";

const Details = () => {
  const book = useLoaderData();
  const {
    _id,
    name,
    author,
    category,
    rating,
    photo,
    quantity,
    message,
  } = book;
  return (
    <div className="container mx-auto py-8">
            <div className="flex">
                <div className="w-1/2 flex justify-center">
                    <div className='px-24'>
                        <img src={photo}  className="rounded-lg shadow-lg h-auto w-screen" />
                    </div>
                </div>
                <div className="w-1/2 pl-8 flex flex-col justify-evenly">
                    <h2 className="text-3xl font-bold mb-2">{name}</h2>
                    <p className="text-lg font-semibold mb-4">By: {author}</p>
                    <hr />
                    <p className="text-lg mt-3 mb-3">{category}</p>
                    <hr />
                    <p className="text-lg mt-4"><span className='font-bold'>Short description:</span> {message}</p>
        
                    <hr />
                    <p className="text-lg">Quantity: <span className='font-bold pl-12'>{quantity}</span></p>
                    
                    <p className="text-lg">
                        Rating: <span className='font-bold pl-24'>{rating}</span> 
                    </p>
                    
                </div>
            </div>
        </div>
  );
};

export default Details;