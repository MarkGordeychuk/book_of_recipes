import React from "react";
import {Link, useRouteLoaderData, useOutletContext} from "react-router-dom";

import {LoaderData as RootLoaderData, OutletContext} from "./Root";


function CategoryList() {
    const { categories } = useRouteLoaderData('root') as RootLoaderData;
    const { setPath } = useOutletContext<OutletContext>();

    React.useEffect(() => {setPath({
        category: null,
        recipe: null,
    })}, [setPath]);

    return (
        <>
            {categories.map(category => (
                <h3>
                    <Link key={category.id} to={`/category/${category.id}/`}>{ category.name }</Link>
                </h3>
            ))}
        </>
    );
}

export default CategoryList;