import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout, Button } from "antd";
import { PlusOutlined, CheckSquareOutlined } from "@ant-design/icons";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types";

const { Header, Content } = Layout;

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="min-h-screen bg-gradient-to-br">
        <Header className="flex items-center justify-between px-6 bg-transparent">
          <div className="w-24">
            <CheckSquareOutlined className="text-2xl text-primary" />
          </div>
        </Header>
        <Content className="p-6 md:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-lg md:p-8">
              <div className="flex justify-end mb-4">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddTask}
                  className="text-white transition-all duration-300 border-none shadow-sm bg-secondary hover:bg-primary hover:text-white"
                >
                  Add Task
                </Button>
              </div>
              <TaskList onEditTask={handleEditTask} />
            </div>
            <TaskForm
              task={editingTask}
              visible={isModalVisible}
              onCancel={handleModalClose}
              onComplete={handleModalClose}
            />
          </div>
        </Content>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
