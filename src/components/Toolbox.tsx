import { useRef, useState } from "react";
import { Button, Overlay } from "react-bootstrap";
import { IoMdMenu } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useSubmit } from "react-router-dom";

type Props = {
    deleteFunction?: (...arg0: any) => void;
};

export default function Toolbox({ deleteFunction }: Props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const submit = useSubmit();

    return (
        <div className="position-absolute end-0 top-0 m-1 z-5 z-3">
            <Button className="bg-light-subtle border-light-subtle" ref={target} onClick={() => setShow(!show)}>
                <IoMdMenu />
            </Button>
            <Overlay target={target.current} show={show} placement="left">
                <div className="bg-light-subtle rounded">
                    <Button
                        variant="danger"
                        className="m-1 py-1 px-2"
                        onClick={
                            deleteFunction ??
                            (() => {
                                submit(
                                    {},
                                    {
                                        method: "delete",
                                        action: "",
                                    }
                                );
                            })
                        }
                    >
                        <MdDelete />
                    </Button>
                </div>
            </Overlay>
        </div>
    );
}
