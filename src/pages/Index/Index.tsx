import { Col, Row } from "react-bootstrap";
import CollectionCard, { CollectionType } from "../collection/CollectionCard";
import ItemCard from "../item/ItemCard";
import { Link, useLoaderData } from "react-router-dom";
import { ItemType, Tag } from "../item/Item";

export default function Index() {
    const { collections, items, tags } = useLoaderData() as {
        collections: CollectionType[];
        items: ItemType[];
        tags: Tag[];
    };

    return (
        <div>
            <h1>Collections:</h1>{" "}
            <Row xs={1} md={3} className="g-4 shadow">
                {collections.length ? (
                    collections.map((collection, index) => (
                        <Col key={collection.name + index}>
                            <CollectionCard collection={collection} />
                        </Col>
                    ))
                ) : (
                    <h2 className="w-100 text-center p-3">
                        No Collections Yet!
                        <br />
                        Create One <Link to="/personal">Here</Link>
                    </h2>
                )}
            </Row>
            <h1>Items:</h1>
            <Row xs={1} md={3} className="shadow">
                {items.length ? (
                    items.map((item, index) => (
                        <Col key={item.name + index}>
                            <ItemCard item={item} />
                        </Col>
                    ))
                ) : (
                    <h2 className="w-100 text-center p-3 ">No Items Yet!</h2>
                )}
            </Row>
            <h1>Tags:</h1>
            <Row className="p-2 m-2 rounded shadow">
                {tags.length ? (
                    tags.map((tag) => (
                        <Col key={tag.name + tag.id}>
                            <Link
                                to="#"
                                className="text-decoration-none text-light-subtle bg-dark-subtle px-2 py-1 rounded hover-shadow"
                            >
                                {tag.name}
                            </Link>
                        </Col>
                    ))
                ) : (
                    <h2 className="w-100 text-center p-3">No Tags Yet!</h2>
                )}
            </Row>
        </div>
    );
}
