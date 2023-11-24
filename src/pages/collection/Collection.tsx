import { Button, Col, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import CollectionCard, { CollectionType } from "./CollectionCard";
import ItemCard from "../item/ItemCard";
import { useUserContext } from "../../contexts/UserContext/useUserContext";
import { useState } from "react";
import AddItem from "../item/AddItem";
import { ItemType } from "../item/Item";

export default function Collection() {
    const { collections, items } = useLoaderData() as {
        collections: CollectionType[];
        items: ItemType[];
    };
    const theCollection = collections[0];
    const { user } = useUserContext();

    const [showAddItem, setShowAddItem] = useState(false);

    return (
        <Row xs={1} md={3}>
            {collections.length ? (
                collections.map((collection, index) => (
                    <Col key={collection.name + index}>
                        <CollectionCard collection={collection} link={collections.length > 1} />
                    </Col>
                ))
            ) : (
                <h2 className="w-100 text-center p-3">
                    No Collections Yet!
                    <br />
                    Create One <Link to="/personal">Here</Link>
                </h2>
            )}

            {collections.length === 1 && (
                <Col md={8}>
                    <h1 className="mb-4">
                        Items:{" "}
                        {user && user.id === theCollection.creator && (
                            <Button className="bg-success border-0" onClick={() => setShowAddItem(!showAddItem)}>
                                Add
                            </Button>
                        )}
                    </h1>
                    {showAddItem && <AddItem collectionId={theCollection.id} />}
                    <Row xs={1} md={2}>
                        {items.map((item, index) => (
                            <Col key={item.name + index} className="mb-5">
                                <ItemCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            )}
        </Row>
    );
}
