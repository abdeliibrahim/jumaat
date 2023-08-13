import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages / components
import Home from './pages/home'
import Results from './pages/results';
import Nav from './components/nav'


function App() {
  return (
    <div class = "main">
      <BrowserRouter>
          <Nav />
  
        <div className='pages'>
        <Routes>
          <Route 
          path = "/"
          element= {<Home />}>
          </Route>
          <Route
          path = "/results"
          element= {<Results />}>
            </Route>
        </Routes>

        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
