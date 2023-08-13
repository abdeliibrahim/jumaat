import {BrowserRouter, Routes, Route} from 'react-router-dom'

// pages / components
import Home from './pages/home'
import Nav from './components/nav'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav />
        <div className='pages'>
        <Routes>
          <Route 
          path = "/"
          element= {<Home />}>

          </Route>
        </Routes>

        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
