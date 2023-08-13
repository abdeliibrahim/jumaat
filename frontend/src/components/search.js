import {Link} from 'react-router-dom'

const Search = () => {
    return (
        <header> 
            <div className="searchBar">
                <form>
                    <input placeholder='Enter a zipcode' autoFocus autoComplete='off'>
                    </input>
                    <button type="Submit">Search</button>
                </form>
            </div>
    
        </header>
    )
}

export default Search