import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isLoggedInContext from '../../../../../../Context/isLoggedInContext';

export default function SignInForm() {
  const navigate = useNavigate();
  // const { isLoggedIn, setisLoggedIn } = useContext(isLoggedInContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(`isLoggedIn = ${isLoggedIn}`);

  const getUser = async () => {
    console.log('get user fired');

    let output;

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          // if (res.isLoggedIn) setisLoggedIn(true);
          if (res.isLoggedIn) {
            setisLoggedIn(true);
            window.alert('Successfully Signed In');
            navigate('/dashboard',{ state: { userID: res.id }});
          } else {
            setEmail('');
            setPassword('');
            window.alert('Incorrect Email adress / Password - Try again or Create an account');
          }
          output = res;
          return output;
        });
    } catch (error) {
      console.log(error);
      throw new Error(`There was an issue getting the user from the database. ${error}`);
    }
    // if (output.isLoggedIn) setIsLoggedIn(true);
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit fired');
    e.preventDefault();
    console.log(e);
    getUser({ email, password });
    // const res = await getUser();
    // console.log(res);
    // if (res.isLoggedIn) {
    //   console.log('condition is true');
    //   // history.push('/dashboard');
    //   // setIsLoggedIn(true);
    //   // navigate('/dashboard');
    // }
  };

  return (
    <>
      <form className='mt-8 space-y-6'>
        <input type='hidden' name='remember' defaultValue='true' />
        <div className='rounded-md shadow-sm -space-y-px'>
          <div>
            <label htmlFor='email-address-create' className='sr-only'>
              Email address
            </label>
            <input
              id='email-address-create'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-500 placeholder-gray-500 dark:text-gray-100 text-gray-700 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='appearance-none rounded-none relative block w-full px-3 py-2 border dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-500 placeholder-gray-500 dark:text-gray-100 text-gray-700 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          {email && password ? (
            <Link
              to='/dashboard' // favorites ideally
              // to='/sign+in'
              // onClick={(e) => getUser(e)}
              onClick={(e) => handleSubmit(e)}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              Submit
            </Link>
          ) : (
            <button
              // onClick={() => handleSubmit()}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
              // handlesubmit='(e) => e.preventDefault();'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}
