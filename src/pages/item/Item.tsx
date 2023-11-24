import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Toolbox from "../../components/Toolbox";
import { useUserContext } from "../../contexts/UserContext/useUserContext";

export type ItemType = {
    id: number;
    name: string;
    collection: number;
    collection_name: string;
    creator: number;
    tags: Tag[];
    comments: string[];
};

export type Tag = {
    id: number;
    name: string;
};
export type Comment = {
    id: number;
    item: number;
    user: number;
    user_name: string;
    text: string;
};

export default function Item() {
    const axios = useAxios();
    const navigate = useNavigate();
    const { user } = useUserContext();

    const { items, comments } = useLoaderData() as { items: ItemType[]; comments: Comment[] };
    const [newComment, setNewComment] = useState("");

    function addComment() {
        if (!newComment) return;
        if (!user) {
            navigate("/login");
            return;
        }
        axios
            .post(`item_management/comments/`, {
                item_id: items[0].id,
                text: newComment,
            })
            .then(() => {
                setNewComment("");
                navigate(".", { replace: true });
            });
    }
    function removeComment(commentId: number) {
        function remove() {
            axios.delete(`item_management/comments/${commentId}/`).then(() => navigate(".", { replace: true }));
        }
        return remove;
    }

    return (
        <>
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
            {items.length === 1 && (
                <div className="bg-light-subtle p-2 rounded border">
                    {comments.length ? (
                        comments.map((comment) => (
                            <div className="bg-dark-subtle p-3 my-2 border rounded position-relative">
                                {user?.id === comment.user && <Toolbox deleteFunction={removeComment(comment.id)} />}
                                <b>{comment.user_name}</b> -- {comment.text}
                            </div>
                        ))
                    ) : (
                        <h3 className="w-100 text-center p-4">No Comments Yet!</h3>
                    )}
                    <FloatingLabel label="Add Comment" className="d-flex align-items-stretch">
                        <Form.Control
                            className="rounded-0 rounded-start border-0"
                            placeholder=""
                            as="textarea"
                            onChange={(e) => {
                                setNewComment(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            value={newComment}
                        />
                        <Button className="rounded-0 rounded-end px-4" onClick={addComment}>
                            Add
                        </Button>
                    </FloatingLabel>
                </div>
            )}
        </>
    );
}
