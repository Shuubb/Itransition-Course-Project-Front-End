import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Toolbox from "../../components/Toolbox";
import { useUserContext } from "../../contexts/UserContext/useUserContext";
import { ItemType } from "./Item";

type Props = {
    item: ItemType;
    link?: boolean;
};

export default function ItemCard({ item, link = true }: Props) {
    const { user } = useUserContext();

    return (
        <div className="position-relative rounded ">
            {!link && ((user && user.id === item.creator) || user?.is_admin) && <Toolbox />}
            <Link to={`/items/${item.id}/`} className={`text-decoration-none ${link ? "" : "pe-none"}`}>
                <Card className="position-relative hover-shadow my-2 fade-in">
                    <Card.Body>
                        <Card.Title className="fs-2 me-5">
                            {item.name}
                            <span className="fs-6 fw-light px-1 text-nowrap">{item.collection_name}</span>
                        </Card.Title>
                        <Card.Text>
                            Tags:{" "}
                            {item.tags
                                ? item.tags.map((tag, index) => (
                                      <span key={tag.name + index}>
                                          {tag.name}
                                          {item.tags.length - 1 !== index ? ", " : "."}
                                      </span>
                                  ))
                                : "none"}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}
