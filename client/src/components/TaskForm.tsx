// src/components/TaskForm.tsx
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input, DatePicker, Select, Button, Modal, message } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { createTask, updateTask } from "../api/tasks";
import { Task } from "../types";
import dayjs from "dayjs";

const { Option } = Select;

interface TaskFormProps {
  task?: Task | null;
  visible: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  visible,
  onCancel,
  onComplete,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        due_date: dayjs(task.due_date),
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const mutation = useMutation(isEditing ? updateTask : createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      form.resetFields();
      onComplete();
      message.success(`Task ${isEditing ? "updated" : "added"} successfully!`);
    },
    onError: () => {
      message.error(
        `Failed to ${isEditing ? "update" : "add"} task. Please try again.`
      );
    },
  });

  const onFinish = (values: Omit<Task, "id">) => {
    const submitData = {
      ...values,
      due_date: values.due_date
        ? typeof values.due_date === "string"
          ? dayjs(values.due_date).format("YYYY-MM-DD")
          : (values.due_date as dayjs.Dayjs).format("YYYY-MM-DD")
        : null,
    };
    if (isEditing && task) {
      mutation.mutate({ id: task.id, ...submitData } as Task);
    } else {
      mutation.mutate(submitData as Task);
    }
  };
  return (
    <Modal
      title={
        <div className="flex items-center text-lg font-semibold text-primary">
          {isEditing ? (
            <EditOutlined className="mr-2" />
          ) : (
            <PlusOutlined className="mr-2" />
          )}
          {isEditing ? "Edit Task" : "Add New Task"}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
      className="font-banana"
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="mt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the task title!" }]}
        >
          <Input className="rounded-md" placeholder="Enter task title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea
            className="rounded-md"
            rows={4}
            placeholder="Enter task description"
          />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select the priority!" }]}
        >
          <Select className="rounded-md" placeholder="Select priority">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="due_date"
          label="Due Date"
          rules={[{ required: true, message: "Please select the due date!" }]}
        >
          <DatePicker className="w-full rounded-md" />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full transition-colors duration-300 bg-primary hover:bg-primary-dark"
            icon={isEditing ? <EditOutlined /> : <PlusOutlined />}
            loading={mutation.isLoading}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
