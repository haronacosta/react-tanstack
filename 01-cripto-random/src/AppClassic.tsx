import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const [number, setNumber] = useState(0);

  const [isLoading, setIsLoading] = useState(true)

  const [refreshToken, setRefreshToken] = useState(0)

  const [error, setError] = useState(null)


  useEffect(() => {

     setIsLoading(true);

    fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
      .then(response => response.text())
      .then(data => {
        setNumber(parseInt(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      }).finally(() => {
        setIsLoading(false);
      });

  }, [refreshToken])
  

  return (
    <>
    {
      isLoading ? <p>Loading...</p> : <p>Random Number: {number}</p>
    }

      <div>{error && <p>Error: {error}</p>}</div>

      <button
      disabled={isLoading}
       type='button' 
       onClick={() => {
        setRefreshToken(prev => prev + 1);
      }}>Fetch New Number</button>
    </>
  )
}

export default App
