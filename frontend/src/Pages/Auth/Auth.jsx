import { useState } from "react";
import { authService } from "../../Services/AuthService";
import { Navigate, useNavigate } from 'react-router-dom';


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "spectator",
    });

    const roleOptions = ["player", "organizer", "admin", "spectator"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleForm = () => setIsLogin((prev) => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const response = isLogin
                ? await authService.login(payload)
                : await authService.register(payload);

            if (response.message == "Request successful") {
                // console.log(response)
                // console.log(`${isLogin ? "Login" : "Registration"} success:`, response);
                // Save user info to localStorage
                localStorage.setItem("user", JSON.stringify(response.token));
                navigate("/");
            }
        } catch (err) {
            console.error("Auth error:", err.message || err);
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Trigger password reset for:", formData.email);
            // actual forgot-password logic goes here
        } catch (err) {
            console.error("Forgot password error:", err.message);
        }
    };

    return (
        <div className="w-full h-screen bg-gray-50 dark:bg-neutral-800 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md px-4">
                    <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-md">
                        <div className="p-6 sm:p-7">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    {isForgotPassword
                                        ? "Forgot Password"
                                        : isLogin
                                            ? "Sign in"
                                            : "Sign up"}
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {isLogin
                                        ? "Don't have an account yet?"
                                        : isForgotPassword
                                            ? "Go back to sign in?"
                                            : "Already have an account?"}
                                    <button
                                        className="text-blue-600 hover:underline font-medium ml-1 dark:text-blue-400"
                                        onClick={() => {
                                            if (isForgotPassword) {
                                                setIsForgotPassword(false);
                                            } else {
                                                toggleForm();
                                            }
                                        }}
                                    >
                                        {isLogin
                                            ? "Sign up here"
                                            : isForgotPassword
                                                ? "Sign in here"
                                                : "Sign in here"}
                                    </button>
                                </p>
                            </div>

                            {isForgotPassword ? (
                                <form className="mt-5" onSubmit={handleForgotPasswordSubmit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm mb-1 text-gray-800 dark:text-gray-200"
                                            >
                                                Enter your email address to reset your password
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="py-2.5 px-4 block w-full border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form className="mt-5" onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">
                                        {!isLogin && (
                                            <div>
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm mb-1 text-gray-800 dark:text-gray-200"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="py-2.5 px-4 block w-full border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm mb-1 text-gray-800 dark:text-gray-200"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="py-2.5 px-4 block w-full border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label
                                                    htmlFor="password"
                                                    className="text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    Password
                                                </label>
                                                {isLogin && (
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsForgotPassword(true);
                                                        }}
                                                        className="text-sm text-blue-600 hover:underline font-medium dark:text-blue-400"
                                                    >
                                                        Forgot password?
                                                    </a>
                                                )}
                                            </div>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="py-2.5 px-4 block w-full border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
                                            />
                                        </div>

                                        {!isLogin && (
                                            <div>
                                                <label
                                                    htmlFor="role"
                                                    className="block text-sm mb-1 text-gray-800 dark:text-gray-200"
                                                >
                                                    Role
                                                </label>
                                                <select
                                                    id="role"
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                    className="py-2.5 px-4 block w-full border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    {roleOptions.map((role) => (
                                                        <option key={role} value={role}>
                                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {isLogin && (
                                            <div className="flex items-center">
                                                <input
                                                    id="remember-me"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="remember-me"
                                                    className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            {isLogin ? "Sign in" : "Sign up"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
