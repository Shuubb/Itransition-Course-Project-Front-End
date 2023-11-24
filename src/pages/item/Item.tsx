import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import ItemCard from "./ItemCard";

export type ItemType = {
    id: number;
    name: string;
    collection: number;
    collection_name: string;
    creator: number;
    tags: Tag[];
};

export type Tag = {
    id: number;
    name: string;
};

export default function Item() {
    const items = useLoaderData() as ItemType[];

    return (
        <Row xs={1} md={3}>
            {items.length ? (
                items.map((item, index) => (
                    <Col key={item.name + index}>
                        <ItemCard item={item} link={items.length > 1} />
                    </Col>
                ))
            ) : (
                <h2 className="w-100 text-center p-3">No Items Yet!</h2>
            )}
        </Row>
    );
}
