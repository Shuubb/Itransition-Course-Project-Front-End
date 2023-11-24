import { useEffect, useState } from "react";
import { FloatingLabel, Form, Row } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import { ItemType } from "../pages/item/Item";
import ItemCard from "../pages/item/ItemCard";

export default function Search() {
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<ItemType[]>([]);
    const axios = useAxios();
    let searchTimeout: NodeJS.Timeout;

    useEffect(() => {
        if (searchText)
            axios
                .get(`item_management/items/?search=${searchText}&&subset=[0,6]`)
                .then((res) => setSearchResult(res.data));
        else setSearchResult([]);
    }, [searchText]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            setSearchText(e.target.value);
        }, 500);
    }

    return (
        <div className="d-flex flex-column w-100">
            <FloatingLabel className="mb-2 w-50 align-self-end" label="Search">
                <Form.Control className="w-100 shadow-lg" placeholder="Search" type="text" onChange={handleInput} />
            </FloatingLabel>
            {searchText && (
                <>
                    <Row xs={1} md={3} className="px-1">
                        {searchResult.length ? (
                            searchResult.map((item, index) => <ItemCard item={item} key={item.name + index} />)
                        ) : (
                            <h3 className="p-4 w-100 text-center fade-in">No Results :(</h3>
                        )}
                    </Row>
                    <hr className="mx-5" />
                </>
            )}
        </div>
    );
}
