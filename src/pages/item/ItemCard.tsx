import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Toolbox from "../../components/Toolbox";
import { useUserContext } from "../../contexts/UserContext/useUserContext";
import { ItemType } from "./Item";
import useAxios from "../../hooks/useAxios";

type Props = {
    item: ItemType;
    link?: boolean;
};

export default function ItemCard({ item, link = true }: Props) {
    const { user } = useUserContext();
    const axios = useAxios();
    const liked = user && item.likes.some((obj) => obj.user === user.id);
    const navigate = useNavigate();

    function switchLike() {
        axios.patch(`item_management/items/${item.id}/`, { like: !liked }).then(() => navigate(".", { replace: true }));
    }

    return (
        <div className="position-relative rounded ">
            <div className="position-absolute end-0 bottom-0 z-1 p-1">
                {liked ? <>Liked</> : <>Not Liked</>}
                <Button onClick={switchLike}>Like</Button>
            </div>
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
