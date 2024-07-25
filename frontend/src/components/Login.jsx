import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authenticationState } from "../state/atoms/AuthenticationState";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const setAuthentication = useSetRecoilState(authenticationState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Validation Logic :-
    let error = "";
    if (name == "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid Email Address."
    }

    if (name == "password" && value.length < 4) {
      error = "Password must be atleast 4 char long"
    }
    setErrors({ ...errors, [name]: error })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email: formValues.email, password: formValues.password };
    try {
      const response = await axios.post("http://localhost:3001/auth/loginCustomer", loginData);
      localStorage.setItem('token', response.data.token);
      setAuthentication(true);
      navigate("/");
    } catch (err) {
      if (err.response) {
        // Handle known err messages :-
        if (err.response.status === 401) {
          alert("Email or Password isn't correct");
        } else if (err.response.status === 403) {
          alert("Email or Password isn't in the valid format");
        } else if (err.response.status === 500) {
          alert("Something went wrong on server side, please try again later");
        } else {
          alert("An unknown error occurred, please try again later");
        }
      } else {
        console.log(err);
        alert("Something went wrong on server side please try again later");
      }
    }

  }
  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-black"
              required
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50 transition duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
