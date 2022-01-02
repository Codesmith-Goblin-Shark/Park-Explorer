import React, { useEffect } from 'react';

function App() {

  const get = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }


  useEffect(()=> {
    const url = 'https://developer.nps.gov/api/v1/parks?limit=100&q=designation%3D%22National%20Park%22&sort=&api_key=Z4psul3z0acso6VKsm1FmpI8nIlQR55XVbN5hxUj'
    const res = fetch(url, get)
      .then(res => res.json())
      .then(data => {
        const result = [];
        //data.data is an array of objs
        for (let i = 0; i < data.data.length; i++) {
          result.push({
            park: data.data[i].fullName,
            // description: data.data[i].description,
            // url: data.data[i].url,
            images: data.data[i].images[0].url
          })
        }
        console.log(result);
        return data;
      })
  }, [])


  return (
    <div>
      <button onClick={()=> handleClick()}>Click here</button>
    </div>
  );
}

export default App;
