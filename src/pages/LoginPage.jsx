import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
 const [name, setname]=useState('')
 const [email, setemail]=useState('')
 const [password, setpassword]=useState('')
 const navigate=useNavigate()
 const handlechange=async(e)=>{
    e.preventDefault()
    try {
        alert('Thank you. but sorry the login was not work beacuses the backend was not created')
        navigate('/')
    } catch (error) {
        alert(error)
        
    }
 }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register & Login</h3>
            <form action="" onSubmit={handlechange} className="space-y-4">

            <input type="text" placeholder='Enter your name'
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name} onChange={(e)=>{setname(e.target.value)}} required />

            <input type="email" placeholder='Enter your Mail'
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email} onChange={(e)=>{setemail(e.target.value)}} required />

            <input type="password" placeholder='Enter your password'
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password} onChange={(e)=>{setpassword(e.target.value)}} required />

            <button  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;