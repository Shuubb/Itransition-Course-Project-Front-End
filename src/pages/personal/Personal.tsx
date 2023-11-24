import { useState } from "react";
import CollectionCard, { CollectionType } from "../collection/CollectionCard";
import { useLoaderData } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useUserContext } from "../../contexts/UserContext/useUserContext";
import AddCollection from "../collection/AddCollection";

export default function Personal() {
    const { collections } = useLoaderData() as { collections: CollectionType[] };
    const { user } = useUserContext();

    const [showAddCollection, setShowAddCollection] = useState(false);

    return (
        <>
            <h1>Hello {user?.username}!</h1>
            <Container className="mx-2">
                <h2 className="mb-3">
                    Your Collections:{" "}
                    <Button className="bg-success border-0" onClick={() => setShowAddCollection(!showAddCollection)}>
                        Add
                    </Button>
                </h2>
                {showAddCollection && <AddCollection />}
                <Row xs={1} md={3}>
                    {collections.map((collection, index) => (
                        <Col key={collection.name + index}>
                            <CollectionCard collection={collection} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
