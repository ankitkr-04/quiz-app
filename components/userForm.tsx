"use client";
import React from 'react';
import { Form, Input, Radio, Button } from 'antd';
import useSaveUser from '@/hooks/useSaveUser';

interface UserFormProps {}

const UserForm: React.FC<UserFormProps> = () => {
  const { onFinish, loading, successMessageVisible } = useSaveUser();
  const [form] = Form.useForm();
  const labelCol = { span: 8 };
  const wrapperCol = { span: 16 };

  return (
    <Form
      form={form}
      name="userForm"
      onFinish={onFinish}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      autoComplete="off"
      className="max-w-lg mx-auto mt-10"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not valid E-mail!' }
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Radio.Group>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Get Started
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
