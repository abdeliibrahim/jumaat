import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { setZipcode } from './zipUtility';


const Search = () => {
    const [zipcode, setZip] = useState('')

const navigate = useNavigate();
    const handleSubmit = (event) => {
        
        event.preventDefault(); // Prevents default form submission behavior
        setZipcode(zipcode);
        navigate('/results'); // Redirect to new page
      }
    return (
        <header> 
            <div className="searchBar">
                <form onSubmit={handleSubmit}>
                    <input placeholder='Enter a zipcode'
                    autoFocus autoComplete='off'
                    onChange={(e) => setZip(e.target.value)}
                    value={zipcode}>
                    </input>
                    <button type="Submit">Search</button>
                </form>
            </div>
    
        </header>
    )
}

export default Search