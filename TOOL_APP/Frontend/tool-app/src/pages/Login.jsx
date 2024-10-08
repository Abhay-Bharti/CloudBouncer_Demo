import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container } from 'react-bootstrap';
import "../App.css"
import NavbarScroll from "../Components/Navbar";
import { validateEmail } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const [error ,setError] = useState(null);

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        if(!validateEmail(credentials.email)){
            setError("Please enter a valid email address");
            return;
        }

        if(!credentials.password)
        {
            setError("Please enter the password");
            return;
        }

        setError("");

        //Login API called

       try{
        const response = await axiosInstance.post("/login",{
            email:credentials.email,
            password:credentials.password,
        });

        if(response.data && response.data.accessToken){
            localStorage.setItem("token",response.data.accessToken);

            navigate("/dashboard");
        }

       } catch(error)
       {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occured. Please try again.")
            }
       }

        
    }

    return (
        <>
            <NavbarScroll />
            <div className="d-flex justify-content-center align-items-center login-box">
                <Container className="login-container">
                    <h1 className="text-center mb-5">Login</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInput} value={credentials.email} required={true} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" onChange={handleInput} value={credentials.password} required={true} minLength={8} />
                        </Form.Group>

                        <div className='mb-2'>Do not have an account? Click <Link to={"/signup"}>here</Link></div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}