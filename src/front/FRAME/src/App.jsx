import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;