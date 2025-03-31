import '../css/authStyle.css';
import "../css/style.css";


function Register() {
    return (
        <div className="authPage">        
            <div className="authHeader">
                <h1>Better Notes</h1>
                <h4>A better way of writing notes</h4>
            </div>
            <div className = "authBox">
                <h3>Register</h3>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />

                <a href='/login'>
                    Already have an account?
                </a>

                <button className='authBtn'>Sign Up</button>
            </div>
        </div>
    );
}
export default Register;