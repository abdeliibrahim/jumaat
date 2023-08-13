import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <header> 
            <div className="container">
                <Link to="/" style={{ 
                    textDecoration: 'none',

             }}>
                    <h1 className='jumaat-title'>jamaat</h1>
                </Link>
            </div>
    
        </header>
    )
}

export default Nav