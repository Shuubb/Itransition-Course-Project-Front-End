import { useRef, useState } from "react";
import { Button, Overlay } from "react-bootstrap";
import { IoMdMenu } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useSubmit } from "react-router-dom";

export default function Toolbox() {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const submit = useSubmit();

    return (
        <div className="position-absolute end-0 m-1 z-5 z-3">
            <Button className="bg-light-subtle border-light-subtle" ref={target} onClick={() => setShow(!show)}>
                <IoMdMenu />
            </Button>
            <Overlay target={target.current} show={show} placement="left">
                <div className="bg-light-subtle rounded">
                    <Button
                        variant="danger"
                        className="m-1 py-1 px-2"
                        onClick={() => {
                            submit(
                                {},
                                {
                                    method: "delete",
                                    action: "",
                                }
                            );
                        }}
                    >
                        <MdDelete />
                    </Button>
                    <Button variant="warning" className="m-1 py-1 px-2" onClick={() => {}}>
                        <CiEdit />
                    </Button>
                </div>
            </Overlay>
        </div>
    );
}
