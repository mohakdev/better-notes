import '../css/authStyle.css';
import "../css/style.css";


function Login() {
    return (
        <div className="authPage">        
            <div className="authHeader">
                <h1>Better Notes</h1>
                <h4>A better way of writing notes</h4>
            </div>
            <div className = "authBox">
                <h3>Login</h3>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />

                <a href='/register'>
                    Don't have an account?
                </a>

                <button className='authBtn'>Sign In</button>
            </div>
        </div>
    );
}
export default Login;