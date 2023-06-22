import "./register.css";
import axios from "axios";
import { useRef, useState } from "react";
import RoomIcon from "@mui/icons-material/Room";

function Register({ setShowRegister }) {
    const [isSuccess, setIsSuccess] = useState(false);
    const username = useRef();
    const email = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const register = async () => {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post("http://localhost:8800/api/users/register", user);
                setIsSuccess(true);
            } catch (error) {
                setIsSuccess(false);
            }
        };

        register();
    };

    return (
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon />
                SangPin
            </div>
            <div className="closeBtn" onClick={() => setShowRegister(false)}>
                X
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={username} />
                <input type="email" placeholder="Email" ref={email} />
                <input type="text" placeholder="Password" ref={password} />
                <button className="registerBtn" type="submit">
                    Register
                </button>
                {isSuccess ? <span className="success">Successfull. You can login now</span> : <span className="failure">Something went wrong</span>}
            </form>
        </div>
    );
}

export default Register;
