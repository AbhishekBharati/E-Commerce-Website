import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <Login />
          <div className="text-center mt-4">
            <p>Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

