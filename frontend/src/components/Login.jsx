import "./login.css";
import axios from "axios";
import RoomIcon from "@mui/icons-material/Room";
import { useRef } from "react";

function Login({ setShowLogin, setCurrentUser }) {
    const username = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const login = async () => {
            const user = {
                username: username.current.value,
                password: password.current.value,
            };
            try {
                const res = await axios.post("http://localhost:8800/api/users/login", user);
                console.log(res);
                setCurrentUser(res.data.username);
                setShowLogin(false);
            } catch (error) {
                console.log(error);
            }
        };

        login();
    };

    return (
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon />
                SangPin
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={username} />
                <input type="text" placeholder="Password" ref={password} />
                <button className="loginBtn">Login</button>
            </form>
        </div>
    );
}

export default Login;
