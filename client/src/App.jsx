import './App.css'

function App() {
  const handleEvent = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/uploads", {
        method: "post", 
        body: new FormData(event.target)
      })
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
    </>
  )
}

export default App
