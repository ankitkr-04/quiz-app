"use client";
import React, { useState } from 'react';
import useSaveUser from '@/hooks/useSaveUser';
import Loader from './loader';

const UserForm: React.FC = () => {
  const { onFinish, loading, successMessageVisible } = useSaveUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>) => {
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
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-8 w-[24rem] md:w-[30rem] lg:w-[36rem]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Get Started</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2 text-left" htmlFor="name">
              Full Name
            </label>
            <input
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-indigo-500"
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-semibold mb-2 text-left" htmlFor="email">
              Email Address
            </label>
            <input
              className="block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm font-semibold mb-2 text-left" htmlFor="gender">
              Gender
            </label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-indigo-500"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={formData.gender === 'male'}
                  required
                />
                <span className="ml-2 text-gray-200">Male</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-indigo-500"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={formData.gender === 'female'}
                  required
                />
                <span className="ml-2 text-gray-200">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-500"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                  checked={formData.gender === 'other'}
                  required
                />
                <span className="ml-2 text-gray-200">Other</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300"
          >
            Get Started
          </button>
        </form>
        {successMessageVisible && (
          <p className="mt-4 text-green-500 text-center">User saved successfully!</p>
        )}
      </div>
    </div>
  );
};

export default UserForm;
