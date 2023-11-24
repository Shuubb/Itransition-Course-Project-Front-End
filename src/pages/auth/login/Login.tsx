import { Link, Form as RouterForm, useActionData } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Button, FloatingLabel, Form } from "react-bootstrap";

export default function Login() {
    const errorOrRedirect = useActionData() as string | JSX.Element;

    return (
        <RouterForm
            className="border rounded p-4 shadow-lg bg-light-subtle text-center d-flex flex-column w-100"
            method="POST"
            action="/login"
        >
            <h1>Log In</h1>
            <hr className="mx-5 my-1" />
            <div className="my-4">
                <FaFacebookF
                    className="text-light mx-3 p-2 border-0 rounded"
                    style={{ backgroundColor: "#3b5998", cursor: "pointer" }}
                    size="3rem"
                />

                <FaGoogle
                    className="text-light mx-3 p-2 border-0 rounded"
                    style={{ backgroundColor: "#dd4b39", cursor: "pointer" }}
                    size="3rem"
                />
            </div>
            <FloatingLabel className="mb-2" label="Username">
                <Form.Control type="text" placeholder="" name="username" autoComplete="username" />
            </FloatingLabel>
            <FloatingLabel className="mb-2" label="Password">
                <Form.Control type="password" placeholder="" name="password" autoComplete="current-password" />
            </FloatingLabel>

            <span className="text-danger d-block">{errorOrRedirect}</span>

            <Button type="submit" className="my-3 w-50 align-self-center">
                Log in
            </Button>

            <p className="my-2">
                Not a member? <Link to="/register">Register</Link>
            </p>
        </RouterForm>
    );
}
