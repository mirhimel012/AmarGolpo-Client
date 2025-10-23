import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../components/Details";
import PrivateAddBook from "../pages/PrivateAddBook";
import PrivateAllBooks from "../pages/PrivateAllBooks";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivateMyList from "../pages/PrivateMyList";
import MyList from "../pages/MyList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children:[
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/bookshelf',
                element: <PrivateAllBooks><AllBooks></AllBooks></PrivateAllBooks>,
                loader: () => fetch('https://amar-golpo-server.vercel.app/books')
            },
            {
                path: '/shareStory',
                element: <PrivateAddBook><AddBook></AddBook></PrivateAddBook>,  
            },
            {
                path: '/mylist',
                element: <PrivateMyList><MyList></MyList></PrivateMyList>,
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/contact',
                element: <Contact></Contact>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
  path: '/details/:id',
  element: <Details />,
  loader: async ({ params }) => {
    const res = await fetch(`https://amar-golpo-server.vercel.app/books/${params.id}`);
    if (!res.ok) throw new Error("Failed to fetch book details");
    return res.json();
  }
}

        ]
    }
]);
export default router;