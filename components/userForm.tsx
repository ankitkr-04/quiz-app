"use client"
import React, { useState } from 'react';
import useSaveUser from '@/hooks/useSaveUser';
import Loader from './loader';
import Image from 'next/image';

import { UserDataProps } from '@/types';

const UserForm: React.FC = () => {
  const { onFinish, loading } = useSaveUser();
  const [formData, setFormData] = useState<UserDataProps>({
    name: '',
    email: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish(formData);
  };

  if (loading) return <Loader />;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white shadow-lg rounded-3xl p-8 sm:px-10 lg:px-12">
        <div className="flex items-center space-x-5">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex justify-center items-center text-yellow-500">
            <Image alt="User Icon" src='/user.svg' width={40} height={40} />
          </div>
          <div className="text-lg text-left font-semibold text-gray-700">
            <h2 className="text-lg">Create Your Profile</h2>
            <p className="text-sm text-gray-500">Enter your name, email, and gender.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-4 text-left font-semibold">
            <div className="flex flex-col">
              <label className="text-gray-600">Full Name</label>
              <div className="relative text-gray-400">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-gray-600 focus:outline-none focus:ring focus:border-gray-900"
                  placeholder="Enter Your Name"
                  required
                />
                <div className="absolute left-3 top-2">
                  <Image src='/user.svg' alt="User Icon" width={20} height={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Email Address</label>
              <div className="relative text-gray-400">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full text-gray-600 focus:outline-none focus:ring focus:border-gray-900"
                  placeholder="Enter Your Email"
                  required
                />
                <div className="absolute left-3 top-2">
                  <Image src='/email.svg' alt="Email Icon" width={20} height={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600">Gender</label>
              <div className="relative mt-2">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2.5 pl-3 pr-8 leading-tight shadow-sm"
                  aria-label="Select your gender"
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <Image src='/arrowdown.svg' alt="Arrow Icon" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-2xl w-full sm:w-auto transition duration-300"
            >
              Proceed
              <Image src='/arrowwhite.svg' alt="Arrow Icon" width={20} height={20} className="inline-block ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
