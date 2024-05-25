"use client";
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
    <div className="relative py-3 sm:max-w-2xl my-auto sm:mx-auto text-left">
      <div className="relative  bg-white mx-2 sm:mx-0 shadow rounded-3xl p-10">
        <div className="flex items-center space-x-5 mx-2">
          <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
            <Image alt="userIcon" src='/user.svg' width={40} height={40} />
          </div>
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed text-xl">Create Your Profile</h2>
            <p className="text-sm text-gray-500 font-normal leading-relaxed">Enter your name, email, and gender.</p>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="divide-y flex flex-col items-center font-semibold divide-gray-200 rounded pt-6 pb-8 mb-4">
            <div className="w-full space-y-4">
              <div className="w-full space-y-4">
                <div className="flex flex-col">
                  <label className="leading-loose text-gray-600">Full Name</label>
                  <div className="relative focus-within:text-gray-600 text-gray-400">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="px-4 py-2 pl-10 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Enter Your Name"
                      required
                    />
                    <div className="absolute left-3 top-2">
                      <Image src='/user.svg' alt="userIcon" width={20} height={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="leading-loose text-gray-600">Email Address</label>
                <div className="relative focus-within:text-gray-600 text-gray-400">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter Your Email"
                    required
                  />
                  <div className="absolute left-3 top-2">
                    <Image src='/email.svg' alt="emailIcon" width={20} height={20} />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor="gender">
                  Gender
                </label>
                <div className="relative mt-2 inline-block w-full">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2.5 px-4 pr-8 leading-tight shadow-sm"
                    aria-label="Select your gender"
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <Image src='/arrowdown.svg' alt="arrowIcon" width={20} height={20} />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-700 mt-8 hover:bg-blue-800 text-white font-bold py-4 px-12 rounded-2xl min-w-64 focus:outline-none focus:shadow-outline transition duration-300"
            >
              Proceed
              <Image src='/arrowwhite.svg' alt="arrowIcon" width={20} height={20} className="inline-block ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
