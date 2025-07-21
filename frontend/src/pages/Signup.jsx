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
   //console.log(response.data)
      
      if (response.data.success) {
     
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        //toast()
        toast.success("Account created successfully!");
        
        navigate('/join');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
       
       <div className="absolute -top-32 -left-32 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse z-0" />

      <Card className="w-full max-w-md bg-black border-gray-500/20 shadow-lg">
        <CardHeader className="text-center">
         <div className="flex justify-center mb-4">
            <div className="bg-gray-900 p-4 rounded-full">
              <User className="h-12 w-12 text-gray-300" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold  bg-clip-text text-white ">
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
                  className="bg-black border-purple-500/20 text-white placeholder:text-gray-200/50 "
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
                  className="bg-black border-purple-500/20 text-white placeholder:text-gray-200/50"
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
                  className=" border-purple-500/20 text-white placeholder:text-gray-200/50"
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
                  className=" border-purple-500/20 text-white placeholder:text-gray-200/50"
                />
                <Lock className="absolute right-3 top-3 h-4 w-4 text-blue-400" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer bg-black hover:bg-black border border-gray-700 hover:shadow-md hover:shadow-gray-800  text-white"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm text-blue-200">
              Already have an account?{" "}
              <Link to="/login" className="text-white hover:text-blue-100 transition-colors">
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
