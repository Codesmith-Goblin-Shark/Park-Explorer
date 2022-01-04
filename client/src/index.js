import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import './index.css';
// import App from './components/App/App';
// import { ThemeProvider } from './components/DarkTheme/ThemeContext';
// import Background from './components/DarkTheme/Background';
// import Toggle from './components/DarkTheme/ThemeToggle';
// import Home from './components/Home/Home';
// import CreateAccountForm from './components/App/Guest/Buttons/CreateAccount/CreateAccountForm/CreateAccountForm';
// import Dashboard from './components/App/Dashboard/Dashboard';
// import SignInPage from './components/App/Guest/Buttons/SignIn/SignInPage/SignInPage';
// import isLoggedInContext from './components/Context/isLoggedInContext';
import AppRouter from './AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
