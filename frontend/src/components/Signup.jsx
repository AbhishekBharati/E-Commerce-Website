import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authenticationState } from "../state/atoms/AuthenticationState";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const setAuthentication = useSetRecoilState(authenticationState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Validation Logic :-
    let error = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address"
    }
    if (name === "password" && value.length < 4) {
      error = "Password must be atleast 4 characters Long."
    }
    if (name === "phone" && (value.length != 10 || isNaN(value))) {
      error = "Invalid Phone number. Must be 10 digits";
    }
    if (name === "confirmPassword" && value != formValues.password) {
      error = "Passwords do not match";
    }
    setErrors({ ...errors, [name]: error });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, phone, email, password } = formValues;
    try {
      const response = await axios.post("http://localhost:3001/auth/signupCustomer", { firstname, lastname, phone, email, password })
      console.log("Done")
      localStorage.setItem('token', response.data.token)
      setAuthentication(true);
      navigate("/");
    } catch (err) {
      if (err.response) {
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
        alert("Something went wrong on server side");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-3 border rounded-lg focus:ring-black"
              required
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="mb-8 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-opacity-50 transition duration-150"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;

