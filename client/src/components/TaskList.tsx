import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  List,
  Card,
  Tag,
  Button,
  Popconfirm,
  Typography,
  Space,
  Dropdown,
  Menu,
  Input,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SortAscendingOutlined,
  CalendarOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { fetchTasks, deleteTask } from "../api/tasks";
import { Task } from "../types";
import debounce from "lodash/debounce";

const { Title, Text } = Typography;
const { Search } = Input;

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

type SortOrder = "dueDate" | "priority" | "title";

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("dueDate");

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery<Task[]>(["tasks"], fetchTasks);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-danger";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-success";
      default:
        return "bg-grey-400";
    }
  };

  const handleSort = (order: SortOrder) => {
    setSortOrder(order);
  };

  const sortMenu = (
    <Menu onClick={({ key }) => handleSort(key as SortOrder)}>
      <Menu.Item key="dueDate">Sort by Due Date</Menu.Item>
      <Menu.Item key="priority">Sort by Priority</Menu.Item>
      <Menu.Item key="title">Sort by Title</Menu.Item>
    </Menu>
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const sortedAndFilteredTasks = useMemo(() => {
    if (!tasks) return [];

    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return filteredTasks.sort((a, b) => {
      switch (sortOrder) {
        case "dueDate":
          return (
            new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          );
        case "priority":
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [tasks, searchTerm, sortOrder]);

  if (isLoading)
    return <div className="py-10 text-center text-text-light">Loading...</div>;

  return (
    <div className="p-6 rounded-lg shadow-sm bg-background">
      <div className="flex flex-col items-center justify-between mb-6 sm:flex-row">
        <Title level={4} className="m-0 text-text-dark font-banana">
          Tasks
        </Title>
        <Space>
          <Search
            placeholder="Search tasks"
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{ width: 200 }}
            className="text-14"
          />
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <Button
              icon={<SortAscendingOutlined />}
              className="border-none text-14 bg-secondary text-text-dark hover:bg-secondary-dark"
            >
              Sort
            </Button>
          </Dropdown>
        </Space>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
        dataSource={sortedAndFilteredTasks}
        renderItem={(task) => (
          <List.Item>
            <Card
              className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              bodyStyle={{
                padding: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              actions={[
                <Tooltip title="Edit Task">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => onEditTask(task)}
                    className="text-primary hover:text-primary-dark"
                  />
                </Tooltip>,
                <Tooltip title="Delete Task">
                  <Popconfirm
                    title="Are you sure you want to delete this task?"
                    onConfirm={() => {
                      deleteTask(task.id).then(() => refetch());
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      className="text-danger hover:text-danger-dark"
                    />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <div
                className={`${getPriorityColor(
                  task.priority
                )} px-4 py-3 border-b border-grey-200`}
              >
                <Text className="font-semibold text-16 text-text-dark">
                  {task.title}
                </Text>
              </div>
              <div className="flex flex-col p-4">
                <Text className="flex-grow mb-4 text-14 text-text-light">
                  {task.description}
                </Text>
                <div className="flex items-center justify-between mt-auto">
                  <Space>
                    <Tooltip title="Priority">
                      <Tag
                        className={`${getPriorityColor(
                          task.priority
                        )} px-2 py-1 rounded-full flex items-center`}
                      >
                        <FlagOutlined className="mr-1 text-white" />
                        <span className="font-semibold text-white uppercase text-10">
                          {task.priority}
                        </span>
                      </Tag>
                    </Tooltip>
                    <Tooltip title="Due Date">
                      <Tag
                        color="blue"
                        className="flex items-center px-2 py-1 rounded-full"
                      >
                        <CalendarOutlined className="mr-1" />
                        <span className="text-12">
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </Tag>
                    </Tooltip>
                  </Space>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TaskList;
