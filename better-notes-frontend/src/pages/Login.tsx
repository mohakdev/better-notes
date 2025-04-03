import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/authStyle.css';
import "../css/style.css";
import axiosInstance from '../logic/AxiosInstance';

function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();
    async function handleLogin() {
        //Trying to login
        try {
            //If email or password empty then return
            if(emailRef.current?.value == '' || passwordRef.current?.value == '') 
            {
                console.log('Please enter complete details');
                return;
            }
            const response = await axiosInstance.post('/login', {
                email : emailRef.current?.value,
                password : passwordRef.current?.value
            });
            //If response successful
            if(response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/');
            }
        }
        catch (error)
        {
            if(error) {
                console.log(error);
            } 
            else {
                console.log("Unable to connect to login endpoint");
            }
        }
    }

    return (
        <div className="authPage">        
            <div className="authHeader">
                <h1>Better Notes</h1>
                <h4>A better way of writing notes</h4>
            </div>
            <div className = "authBox">
                <h3>Login</h3>
                <input type="text" ref={emailRef} placeholder="Email" />
                <input type="password" ref={passwordRef} placeholder="Password" />

                <a href='/register'>
                    Don't have an account?
                </a>

                <button onClick={handleLogin} className='authBtn'>Sign In</button>
            </div>
        </div>
    );
}
export default Login;