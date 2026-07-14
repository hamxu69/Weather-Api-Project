function App() {
    function DisplayFunc() {
        const InputField = document.querySelector('.Input');
        let Name = '';
        Name = InputField.value;
    }
    return (
        <>
            <input className="Input" type="text" />
            <button onClick={DisplayFunc}>submit</button>
            <h1>{Name}</h1>
        </>
    );
}

export default App;