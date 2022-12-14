import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import BreadcrumbDropdownToggle from "./BreadcrumbDropdownToggle";
import {Category, PathData} from "../routes/Root";


export interface propsData {
    pathData: PathData,
    categories: Array<Category>,
}


export default function PathBreadcrumb({ pathData, categories }: propsData) {
    return (
        <Breadcrumb>
            <LinkContainer to="/">
                <Breadcrumb.Item>Рецепты</Breadcrumb.Item>
            </LinkContainer>
            { pathData.category
                ? <li className="breadcrumb-item">
                    <Link to={`/category/${pathData.category.id}/`}>
                        {pathData.category.name}
                    </Link>

                    <Dropdown as="span" align="end">
                        <Dropdown.Toggle as={BreadcrumbDropdownToggle}/>
                        <Dropdown.Menu>
                            { categories.map(category => (
                                <LinkContainer key={category.id} to={`category/${category.id}/`}>
                                    <Dropdown.Item >{ category.name }</Dropdown.Item>
                                </LinkContainer>
                            )) }
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                : null
            }
            { pathData.recipe
                ? <LinkContainer to={`/recipe/${pathData.recipe.id}/`}>
                    <Breadcrumb.Item>{pathData.recipe.name}</Breadcrumb.Item>
                </LinkContainer>
                : null
            }
        </Breadcrumb>
    );
}