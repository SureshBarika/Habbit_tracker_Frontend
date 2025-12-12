import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../api"

const Register = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(false)
    const [remember, setRemember] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")

    const navigate = useNavigate()   // ✔️ Correct place

    const register = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError(true)
            return
        }

        const payload = { name: username, email, password }

        const response = await registerUser(payload)

        if (response.status === 201 || response.status === 400) {
            navigate("/login")   
        } else {
            setError(response.data.message)
        }
    }

    return (
        <div className="container">
            <div className="form-box">
                <h2>Register</h2>
                <p>Welcome</p>

                <form onSubmit={register}>
                    {error && <p>Please Provide valid input</p>}
                    
                    <div className="input-group">
                        <input type="text" required className="input-field"
                            onChange={(e) => setUsername(e.target.value)} />
                        <label>Username</label>
                        <div className="glow-line"></div>
                    </div>

                    <div className="input-group">
                        <input type="text" required className="input-field"
                            onChange={(e) => setEmail(e.target.value)} />
                        <label>Email</label>
                        <div className="glow-line"></div>
                    </div>

                    <div className="input-group">
                        <input type="password" required className="input-field"
                            onChange={(e) => setPassword(e.target.value)} />
                        <label>Password</label>
                        <div className="glow-line"></div>
                    </div>

                    <div className="input-group">
                        <input type="password" required className="input-field"
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label>Confirm Password</label>
                        <div className="glow-line"></div>
                    </div>

                    <button type="submit" className="login-btn">
                        <span>SIGN UP</span>
                        <div className="btn-glow"></div>
                    </button>

                    <div className="signup-link">
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
