import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {LinkContainer} from "react-router-bootstrap";

import {Recipe} from "../routes/CategoryRetrieve";


export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const cardBody = (
        <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>
                {recipe.description}
            </Card.Text>
            <Card.Text>
                Время приготовления: {recipe.cooking_time} мин
            </Card.Text>
            <LinkContainer to={`/recipe/${recipe.id}/`}>
                <Button>Читать</Button>
            </LinkContainer>
        </Card.Body>
    );

    return (
        <Card className="mb-3">
            { recipe.image
                ? <Row className="g-0">
                    <Col md="4">
                        <img src={recipe.image} className="img-fluid rounded-start" alt={recipe.name}/>
                    </Col>
                    <Col md="8">
                        { cardBody }
                    </Col>
                </Row>
                : cardBody
            }
        </Card>
    );
}