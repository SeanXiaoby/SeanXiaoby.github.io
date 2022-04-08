import { useState } from 'react'
function App() {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [formyear, setFormyear] = useState("");
    const handleOnSubmit = async (e) => {
        alert("Sending "+JSON.stringify({ name, genre, formyear }));
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, genre, formyear }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved successfully");
            setGenre("");
            setFormyear("");
        }
    }
    return (
        <>
            <h1>This is a React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name" 
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="genre" 
                value={genre} onChange={(e) => setGenre(e.target.value)} />
                <input type="text" placeholder="formyear" 
                value={formyear} onChange={(e) => setFormyear(e.target.value)} />
                <button type="submit" 
                onClick={handleOnSubmit}>submit</button>
            </form>

        </>
    );
}

export default App;