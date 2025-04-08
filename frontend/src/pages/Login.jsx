import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { User, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-hot-toast";

function Login() {
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
        
        // Get the redirect path from location state or default to joinroom
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f3460] border-blue-500/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <User className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-blue-200">
            Sign in to continue your coding journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="bg-[#1a1a2e] border-blue-500/20 text-white placeholder:text-blue-200/50"
                />
                <User className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
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
                  className="bg-[#1a1a2e] border-blue-500/20 text-white placeholder:text-blue-200/50"
                />
                <Lock className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm text-blue-200/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;