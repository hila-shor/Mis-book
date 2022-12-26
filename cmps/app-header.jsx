const { NavLink } = ReactRouterDOM

export function AppHeader({setPage}){


    return  <header className="app-header main-layout">
                <div className="header-container">
                    <h1>Mis Book</h1>
                    <nav className="app-nav">
                        <NavLink to="/">Home</NavLink> |
                        <NavLink to="/about">About Us</NavLink> |
                        <NavLink to="/books">Books</NavLink> 
                    </nav>
                </div>
            </header>
}