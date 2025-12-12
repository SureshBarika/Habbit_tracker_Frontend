import { Link,useNavigate } from "react-router-dom";
import { useState } from "react"
import { loginUser} from "../../api"

import "./Login.css";

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        const paylode = {email,password}
        const response = await loginUser(paylode)
        if (response.status === 200) {
            const data = response.data
            localStorage.setItem("jwtToken",data.token)
            localStorage.setItem("habbitUserId",data.user.userId)
            navigate("/")
        }else {
            console.log(response.mesage)
        }

    }

    return (
        <div className="container">
            <div className="form-box">
                <h2>Login</h2>
                <p>Welcome Back</p>

                <form onSubmit={login}>
                    <div className="input-group">
                        <input type="text" id="Email" required className="input-field" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="Email">Email</label>
                        <div className="glow-line"></div>
                    </div>

                    <div className="input-group">
                        <input type="password" id="password" required className="input-field" onChange={(e) => setpassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                        <div className="glow-line"></div>
                    </div>

                    <div className="remember-forgot">
                        <div className="remember">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login-btn">
                        <span>SIGN IN</span>
                        <div className="btn-glow"></div>
                    </button>

                    <div className="signup-link">
                        Don't have an account? <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
