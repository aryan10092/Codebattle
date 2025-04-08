import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        // Store the token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success("Account created successfully!");
        // Navigate directly to joinroom page
        navigate('/join');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
            Create Account
          </CardTitle>
          <CardDescription className="text-blue-200">
            Join the coding battle community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Username</label>
              <div className="relative">
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-[#1a1a2e] border-blue-500/20 text-white placeholder:text-blue-200/50"
                />
                <User className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
              </div>
            </div>

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
                <Mail className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">Confirm Password</label>
              <div className="relative">
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
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
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm text-blue-200/70">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:text-blue-300">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;