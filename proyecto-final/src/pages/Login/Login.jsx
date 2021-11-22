// Login Page
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


import { useUserContext } from '../../Context/UserContext';

export default function Login() {
    const { login, token } = useUserContext();
    // States to see the inputs info, and then query and compare
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    // It query if user information is valid
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(username, password);

        setError(!logged);
        setUsername("");
        setPassword("");
    }

    // If token is valid, it will load "redirect"
    if (token) {
        console.log("Logueed")
        return <Navigate replace to="/redirect" />
    }

    return (
        // html and design
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <main className="square bg-gray-800 rounded-3xl">
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 items-center justify-center">
                    <h2 className="uppercase text-4xl lg:text-5xl font-extrabold text-white text-center pb-4">API -Proyect</h2>

                    {error && <p className="w-full rounded p-6 text-center text-white font-roboto bg-yellow-700 select-none">
                    Something went wrong. Please verify that the credentials are valid or correct
                    </p>}

                    <input className="font-big w-full text-gray-700 focus:outline-none focus:ring focus:border-blue-500 p-4 rounded"
                        type='text'
                        value={username}
                        placeholder='Enter your username'
                        onChange={(e) => onChange(e, setUsername)}
                    />

                    <input className="font-big w-full text-gray-700 focus:outline-none focus:ring focus:border-blue-500 p-4 rounded"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => onChange(e, setPassword)}
                        value={password}
                    />

                    <button className="mt-6 w-full transition rounded border border-blue-500 duration-300 ease-in-out text-xl text-extrabold bg-blue-500 hover:bg-blue-800 p-4 text-gray-100">Sign In </button>
                </form>
            </main>
        </div>
    );
}