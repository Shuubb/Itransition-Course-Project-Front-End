import { FloatingLabel, Form, Button } from "react-bootstrap";
import { Form as RouterForm, useLoaderData } from "react-router-dom";
import { Tag } from "./Item";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";

export default function AddItem({ collectionId }: { collectionId: number }) {
    const { tags } = useLoaderData() as { tags: Tag[] };
    const tagNames = tags.map((item) => item.name);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <RouterForm
            className="border rounded p-4 m-4 shadow bg-light-subtle text-center col"
            method="POST"
            action="/items/"
        >
            <h2>Add Item</h2>
            <hr className="mx-5 my-1" />

            <FloatingLabel label="Name">
                <Form.Control className="my-3" type="text" placeholder="" name="name" required />
            </FloatingLabel>
            <input type="hidden" name="collection" value={collectionId} />
            <Form.Group className="mt-3">
                <Typeahead
                    id="tags"
                    multiple
                    onChange={(newState: any) => {
                        newState[newState.length - 1] =
                            newState[newState.length - 1].label ?? newState[newState.length - 1];

                        setSelectedTags(newState);
                    }}
                    selected={selectedTags}
                    allowNew
                    options={tagNames}
                    placeholder="Choose Tags..."
                />
                <input type="hidden" name="tags" value={JSON.stringify(selectedTags)} />
            </Form.Group>
            <Button type="submit" className="my-3">
                Add
            </Button>
        </RouterForm>
    );
}
