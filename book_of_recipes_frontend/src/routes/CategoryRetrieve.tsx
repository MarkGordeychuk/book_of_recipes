import React from 'react';
import axios from "axios";
import {Link, LoaderFunctionArgs, useLoaderData, useOutletContext, useRouteLoaderData} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

import { apiUrl } from "../settings";
import {LoaderData as RootLoaderData, OutletContext} from "./Root";
import RecipeCard from "../components/RecipeCard";


export interface Recipe {
    id: number,
    name: string,
    image: string | null,
    description: string,
    cooking_time: number,
}

export interface Category {
    id: number,
    name: string,
    recipes: Array<Recipe>,
}

export async function loader({params}: LoaderFunctionArgs): Promise<Category> {
    const response = await axios.get<Category>(`${apiUrl}category/${params.id}/`);
    return response.data;
}

function CategoryRetrieve() {
    const recipeList = useLoaderData() as Category;
    const { categories } = useRouteLoaderData('root') as RootLoaderData;
    const { setPath } = useOutletContext<OutletContext>();

    React.useEffect(() => {setPath({
        category: {
            id: recipeList.id,
            name: recipeList.name,
        },
        recipe: null,
    })}, [recipeList, setPath]);

    const CardBody = (recipe: Recipe) => (
        <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            {recipe.description}
        </Card.Body>
    );

    return (
        <div>
            {recipeList.recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}

export default CategoryRetrieve;