import React from 'react';
import {Outlet, useLoaderData, Link} from 'react-router-dom';
import axios from "axios";
import Container from "react-bootstrap/Container";

import Header from '../components/Header';
import { apiUrl } from "../settings";
import PathBreadcrumb from "../components/PathBreadcrumb";


export interface Category {
    id: number,
    name: string,
}

export interface LoaderData {
    categories: Array<Category>,
}

export interface PathData {
    category: Category | null,
    recipe: { id: number, name: string } | null,
}

export interface OutletContext {
    setPath: React.Dispatch<React.SetStateAction<PathData>>
}

export async function loader(): Promise<LoaderData> {
    const [categoriesResponse, ] = await Promise.all([
        axios.get<Array<Category>>(apiUrl),
    ]);
    return {
        categories: categoriesResponse.data
    };
}

function Root() {
    const { categories } = useLoaderData() as LoaderData;
    const [path, setPath] = React.useState<PathData>({category: null, recipe: null});
    return (
        <div className="main-wrapper">
            <Header bg="primary" variant="dark"/>
            <Container as="main" className="mt-5">
                <PathBreadcrumb pathData={path} categories={categories} />
                <Outlet context={{ setPath }} />
            </Container>
        </div>
    );
}

export default Root;
