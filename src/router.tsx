import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TeamsPage from './pages/TeamsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TasksPage from './pages/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import KanbanPage from './pages/KanbanPage';
import GanttPage from './pages/GanttPage';
import DailyReportsPage from './pages/DailyReportsPage';
import WeeklyReportsPage from './pages/WeeklyReportsPage';
import SettingsPage from './pages/SettingsPage';

export const router = createBrowserRouter([{ path:'/', element:<App/>, children:[
{element:<AuthLayout/>, children:[{path:'/login',element:<LoginPage/>},{path:'/register',element:<RegisterPage/>}]},
{path:'/app',element:<AppLayout/>, children:[{index:true,element:<Navigate to='dashboard'/>},{path:'dashboard',element:<DashboardPage/>},{path:'teams',element:<TeamsPage/>},{path:'projects',element:<ProjectsPage/>},{path:'projects/:projectId',element:<ProjectDetailPage/>},{path:'tasks',element:<TasksPage/>},{path:'tasks/:taskId',element:<TaskDetailPage/>},{path:'kanban',element:<KanbanPage/>},{path:'gantt',element:<GanttPage/>},{path:'daily-reports',element:<DailyReportsPage/>},{path:'weekly-reports',element:<WeeklyReportsPage/>},{path:'settings',element:<SettingsPage/>}]},
{path:'*',element:<Navigate to='/app/dashboard'/>}
]}]);
