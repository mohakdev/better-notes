function Login() {
    return (
        <>        
            <div>
                <h1>Better Notes</h1>
                <h4>A better way of writing notes</h4>
            </div>
            <div>
                <h3>Login</h3>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button onClick={() => console.log("Open Register Page")}>
                    Don't have an account?
                </button>
                <button>Sign in</button>
            </div>
        </>
    );
}
export default Login;