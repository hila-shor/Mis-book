const { useState }= React

import {Home} from './pages/home.jsx'
import { AboutUs } from './pages/about-us.jsx';
import { BookIndex } from './pages/book-index.jsx';


export function App() {
    const [page, setPage] = useState('book')
    console.log('page is', page)

    return <section className="app">
        <header className="app-header main-layout">
            <h1>Mis Book</h1>
            <nav className="nav-bar main-layout">
                <a href="#" onClick={() => setPage('home')}>Home</a> | 
                <a href="#" onClick={() => setPage('about-us')}>About us</a> | 
                <a href="#" onClick={() => setPage('book')}>Books</a>
            </nav>
        </header>
        <main>
            {page==='home' && <Home/>}
            {page==='about-us' &&  <AboutUs/>}
            {page==='book' &&  <BookIndex/>}
            
        </main>
    </section>
}