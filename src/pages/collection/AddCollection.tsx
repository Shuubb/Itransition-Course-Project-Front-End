import React, { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useLoaderData, Form as RouterForm } from "react-router-dom";

export default function AddCollection() {
    const [imageError, setImageError] = useState("");

    const { topicOptions } = useLoaderData() as { topicOptions: string[] };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>): void {
        if (!e.target.files) return;
        const file = e.target.files[0];

        if (file.type.startsWith("image/")) {
            setImageError("");
        } else {
            e.target.value = "";
            setImageError("Wrong File Type!");
        }
    }

    return (
        <RouterForm
            className="border rounded p-4 my-4 shadow bg-light-subtle text-center"
            method="POST"
            action="/collections/"
            encType="multipart/form-data"
        >
            <h2>Add Collection</h2>
            <hr className="mx-5 my-1" />

            <FloatingLabel label="Collection Name">
                <Form.Control required className="my-3" type="text" placeholder="" name="name" />
            </FloatingLabel>
            <FloatingLabel label="Collection Description">
                <Form.Control
                    required
                    className="my-3"
                    type="text"
                    placeholder=""
                    onChange={(e) => (e.target.style.height = `${e.target.scrollHeight}px`)}
                    name="description"
                />
            </FloatingLabel>

            <FloatingLabel label="Select Topic">
                <Form.Select name="topic" className="my-3">
                    {topicOptions && topicOptions.map((topic) => <option key={topic}>{topic}</option>)}
                </Form.Select>
            </FloatingLabel>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" size="lg" accept="image/*" name="image" onChange={handleImageUpload} />
                <span className="text-danger">{imageError}</span>
            </Form.Group>

            <Button type="submit" className="my-3">
                Add
            </Button>
        </RouterForm>
    );
}
