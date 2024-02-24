import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/uploads", {
        method: "get"
      })
      const { result } = await res.json()
      setData(result)
    }
    fetchData()
  }, [])

  const handleEvent = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "post", 
        body: new FormData(event.target)
      })
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>File Flow</h1>
      <form onSubmit={handleEvent}>
        <input type="file" name='file' id='file' />
        <input type="submit" name="submit" id="submit" value="Upload" />
      </form>
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="data-container">
          <h2>Objects:</h2>
          {/* Iterate over the data array and display URLs */}
          <ul>
            {data.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url.split("/").pop()}
              </a>
            </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default App
