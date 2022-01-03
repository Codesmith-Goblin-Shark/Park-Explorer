import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from './components/DarkTheme/ThemeContext';
import Background from './components/DarkTheme/Background';
import Toggle from './components/DarkTheme/ThemeToggle';
import Home from './components/Home/Home';
import CreateAccount from './components/App/Guest/Buttons/CreateAccount/CreateAccountForm/CreateAccountForm';
import Dashboard from './components/App/Dashboard/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Background>
          <div className='absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6'>
            <Toggle />
          </div>
          <Home />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/new+user' element={<CreateAccount />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Background>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
