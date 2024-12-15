import { Routes, Route } from 'react-router-dom'

import Home from "./pages/home/Home";
import Categories from "./pages/categories/Categories";
import Error from "./pages/error/Error";

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
