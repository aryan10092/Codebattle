import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { User, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Store the token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success("Logged in successfully!");
        
        
        const from = location.state?.from?.pathname || '/join';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
     
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse z-0" />

      <Card className="w-full max-w-md bg-black border border-blue-500/20 shadow-2xl relative z-10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-900 p-4 rounded-full shadow-lg">
              <User className="h-12 w-12 text-gray-300 drop-shadow-lg" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold  bg-clip-text text-white tracking-tight drop-shadow">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-blue-200 mt-2">
            Sign in to continue your coding journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className=" border border-blue-500/20 text-white placeholder:text-gray-200/50 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
                />
                <User className="absolute right-3 top-3 h-4 w-4 text-blue-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Password</label>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className=" border border-blue-500/20 text-white placeholder:text-gray-200.50 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 transition"
                />
                <Lock className="absolute right-3 top-3 h-4 w-4 text-blue-400 pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-black hover:bg-black border border-gray-700 hover:shadow-md hover:shadow-gray-800 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <svg className="inline mr-2 w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center text-sm text-blue-200 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white hover:text-blue-100 font-medium transition-colors">
                Sign up 
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );}
