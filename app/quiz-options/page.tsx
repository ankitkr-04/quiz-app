"use client"
import React, { useState } from 'react';
import { Form, Slider, Select, Button, Space, message } from 'antd';
import useQuizOptionsForm from '@/hooks/useQuizOptionsForm';

const { Option } = Select;

const QuizOptionsPage: React.FC = () => {
  const {
    formValues,
    handleFormChange,
    handleFormSubmit,
    categoryOptions,
    difficultyOptions,
  } = useQuizOptionsForm();

  const [isSaving, setIsSaving] = useState(false);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await handleFormSubmit();
      setIsSaving(false);
      message.success('Quiz options saved successfully!');
    } catch (error) {
      setIsSaving(false);
      message.error('Failed to save quiz options. Please try again.');
      console.error('Error saving quiz options:', error);
    }
  };

  return (
    <Form
      name="quizOptionsForm"
      initialValues={formValues}
      onValuesChange={handleFormChange}
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: '600px', margin: 'auto' }}
    >
      <Form.Item
        name="numQuestions"
        label="Number of Questions"
        rules={[
          { type: 'number', min: 5, max: 50, required: true, message: 'Please enter a number between 5 and 50' },
        ]}
      >
        <Slider
          min={5}
          max={50}
          value={formValues.numQuestions}
          onChange={(value) => handleFormChange({ numQuestions: value })}
          tooltip={{open: true, placement: 'bottom'}}
          
        />
      </Form.Item>

      <Form.Item
        name="difficulty"
        label="Difficulty"
        rules={[{ required: true, message: 'Please select a difficulty level' }]}
      >
        <Select
          value={formValues.difficulty}
          onChange={(value) => handleFormChange({ difficulty: value })}
        >
          {difficultyOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.option}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="categories"
        label="Categories"
        rules={[{ required: true, message: 'Please select at least one category' }]}
      >
        <Select
          mode="multiple"
          value={formValues.categories}
          onChange={(value) => handleFormChange({ categories: value })}
        >
          {categoryOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.option}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={isSaving}>
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default QuizOptionsPage;
