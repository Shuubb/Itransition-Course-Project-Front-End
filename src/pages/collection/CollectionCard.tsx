import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/useUserContext";
import Toolbox from "../../components/Toolbox";

export type CollectionType = {
    creator: number;
    description: string;
    id: number;
    image_link: null | string;
    name: string;
    topic: string;
};

type Props = {
    collection: CollectionType;
    link?: boolean;
};

export default function CollectionCard({ collection, link = true }: Props) {
    const { user } = useUserContext();

    return (
        <div className="position-relative hover-shadow fade-in rounded">
            {!link && ((user && user.id === collection.creator) || user?.is_admin) && <Toolbox />}
            <Link to={`/collections/${collection.id}/`} className={`text-decoration-none ${link ? "" : "pe-none"}`}>
                <Card className="shadow mb-5">
                    {collection.image_link ? (
                        <Card.Img
                            src={collection.image_link}
                            height="200px"
                            className="object-fit-cover bg-light-subtle"
                        />
                    ) : (
                        <div
                            style={{
                                lineHeight: "200px",
                                fontSize: "100px",
                            }}
                            className="text-center fw-bald border rounded text-light-subtle bg-dark-subtle"
                        >
                            {collection.name
                                .split(" ")
                                .map((word) => word.charAt(0))
                                .join("")}
                        </div>
                    )}
                    <Card.Body>
                        <Card.Title className="fs-2">
                            {collection.name}
                            <span className="fs-6 fw-light px-1">{collection.topic}</span>
                        </Card.Title>
                        <Card.Text>{collection.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}
