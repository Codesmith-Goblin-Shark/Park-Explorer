import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App/App';
import { ThemeProvider } from './components/DarkTheme/ThemeContext';
import Background from './components/DarkTheme/Background';
import Toggle from './components/DarkTheme/ThemeToggle';
import Home from './components/Home/Home';
import CreateAccountForm from './components/App/Guest/Buttons/CreateAccount/CreateAccountForm/CreateAccountForm';
import Dashboard from './components/App/Dashboard/Dashboard';
import SignInPage from './components/App/Guest/Buttons/SignIn/SignInPage/SignInPage';
import isLoggedInContext from './components/Context/isLoggedInContext';

export default function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <isLoggedInContext.Provider value={false}>
        <BrowserRouter>
          <ThemeProvider>
            <Background>
              <div className='absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6'>
                <Toggle />
              </div>
              <Home />
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='/new+user' element={<CreateAccountForm />} />
                <Route path='/sign+in' element={<SignInPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
            </Background>
          </ThemeProvider>
        </BrowserRouter>
      </isLoggedInContext.Provider>
    </>
  );
}
