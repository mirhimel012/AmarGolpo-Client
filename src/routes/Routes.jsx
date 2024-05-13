import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBooks";
import BorrowedBooks from "../pages/BorrowedBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
                element: <AddBook></AddBook>,
            },
            {
                path: '/allbooks',
                element: <AllBooks></AllBooks>,
                loader: () => fetch('http://localhost:5000/book')
            },
            {
                path: '/borrowedbooks',
                element: <BorrowedBooks></BorrowedBooks>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            }
        ]
    }
]);
export default router;