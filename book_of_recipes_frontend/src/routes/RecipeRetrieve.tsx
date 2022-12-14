import React from 'react';
import axios from "axios";
import {LoaderFunctionArgs, useLoaderData, useOutletContext} from "react-router-dom";

import {Category, OutletContext} from "./Root";
import { apiUrl } from "../settings";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export interface Ingredient {
    ingredient: string,
    amount: string,
}

export interface Step {
    step_num: number,
    content: string,
}

export interface Recipe {
    id: number,
    name: string,
    image: string,
    description: string,
    cooking_time: number,
    category: Category,
    ingredients: Array<Ingredient>,
    steps: Array<Step>,
}

export async function loader({params}: LoaderFunctionArgs): Promise<Recipe> {
    const response = await axios.get<Recipe>(`${apiUrl}recipe/${params.id}/`);
    return response.data;
}

function RecipeRetrieve() {
    const recipe = useLoaderData() as Recipe;
    const { setPath } = useOutletContext<OutletContext>();

    React.useEffect(() => {setPath({
        category: recipe.category,
        recipe: {
            id: recipe.id,
            name: recipe.name,
        },
    })}, [setPath, recipe]);

    const description = (
        <>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
            <p>Время приготовления: {recipe.cooking_time} мин</p>
            <p>Ингридиенты:</p>
            <ul>
                { recipe.ingredients.map(ingredient => (
                    <li key={`${recipe.id}_${ingredient.ingredient}`}>
                        {ingredient.ingredient} - {ingredient.amount}
                    </li>
                )) }
            </ul>
        </>
    )

    return (
        <>
            {recipe.image
                ? <Row>
                    <Col md="4">
                        <img src={recipe.image} className="img-fluid" alt={recipe.name}/>
                    </Col>
                    <Col md="8">
                        { description }
                    </Col>
                </Row>
                : description
            }
            <div className="mt-4">
                <h3>Пошаговый рецепт приготовления:</h3>
                <ol className="mt-2">
                    { recipe.steps.map((step) => (
                        <li key={`${recipe.id}_${step.step_num}`}>{ step.content }</li>
                    )) }
                </ol>
            </div>
        </>
    );
}

export default RecipeRetrieve;