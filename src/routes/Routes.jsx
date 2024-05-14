import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../components/Details";
import PrivateAddBook from "../pages/PrivateAddBook";
import PrivateAllBooks from "../pages/PrivateAllBooks";
import PrivateBorrowedBooks from "../pages/PrivateBorrowedBooks";

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
                path: '/addbook',
                element: <PrivateAddBook><AddBook></AddBook></PrivateAddBook>,  
            },
            {
                path: '/allbooks',
                element: <PrivateAllBooks><AllBooks></AllBooks></PrivateAllBooks>,
                loader: () => fetch('http://localhost:5000/book')
            },
            {
                path: '/borrowedbooks',
                element: <PrivateBorrowedBooks><BorrowedBooks></BorrowedBooks></PrivateBorrowedBooks>,
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
                element: <Details></Details>,
                loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
            }
        ]
    }
]);
export default router;