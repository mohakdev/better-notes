import { useNavigate } from 'react-router-dom';
import '../css/authStyle.css';
import "../css/style.css";
import { useRef } from 'react';
import axiosInstance from '../logic/AxiosInstance';


function Register() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const navigate = useNavigate();
    
    async function handleRegister() {
        //Trying to register
        try {
            //If email or password empty then return
            if(emailRef.current?.value == '' || passwordRef.current?.value == '') 
            {
                console.log('Please enter complete details');
                return;
            }
            const response = await axiosInstance.post('/create-account', {
                email : emailRef.current?.value,
                password : passwordRef.current?.value
            });
            if(response.data && response.data.error) {
                console.log(response.data.error);
                return;
            }
            //If response successful
            if(response.data && response.data.accessToken) {
                console.log("Navigating to home...");
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
                console.log("Unable to connect to register endpoint");
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
                <h3>Register</h3>
                <input type="text" placeholder="Email" ref={emailRef}/>
                <input type="password" placeholder="Password" ref={passwordRef}/>

                <a href='/login'>
                    Already have an account?
                </a>

                <button onClick={handleRegister} className='authBtn'>Sign Up</button>
            </div>
        </div>
    );
}
export default Register;