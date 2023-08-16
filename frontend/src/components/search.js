import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Search = () => {
const navigate = useNavigate();
    const handleSubmit = (event) => {
        
        event.preventDefault(); // Prevents default form submission behavior
        navigate('/results'); // Redirect to new page
      }
    return (
        <header> 
            <div className="searchBar">
                <form onSubmit={handleSubmit}>
                    <input placeholder='Enter a zipcode' autoFocus autoComplete='off'>
                    </input>
                    <button type="Submit">Search</button>
                </form>
            </div>
    
        </header>
    )
}

export default Search