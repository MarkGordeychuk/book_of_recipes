import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root, {loader as rootLoader} from "./routes/Root";
import CategoryList from "./routes/CategoryList";
import CategoryRetrieve, {loader as categoryRetrieveLoader} from "./routes/CategoryRetrieve";
import RecipeRetrieve, {loader as recipeRetrieveLoader} from "./routes/RecipeRetrieve";
import React from "react";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: rootLoader,
        id: 'root',
        children: [
            {
                index: true,
                element: <CategoryList />,
            },
            {
                path: 'category/:id/',
                element: <CategoryRetrieve />,
                loader: categoryRetrieveLoader,
            },
            {
                path: 'recipe/:id/',
                element: <RecipeRetrieve />,
                loader: recipeRetrieveLoader,
            }
        ]
    }
]);

export default function App() {
    return (<RouterProvider router={router} />);
}