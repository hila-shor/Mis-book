
const { useState }= React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM


import { AboutIndex } from "./cmps/about-index.jsx"
import { Team } from "./cmps/team.jsx"
import { Vision } from "./cmps/vision.jsx"
import { AppHeader } from './cmps/app-header.jsx';
import { UserMsg } from './cmps/user-msg.jsx'

import {Home} from './pages/home.jsx'
import { AboutUs } from './pages/about-us.jsx';
import { BookEdit } from "./pages/book-edit.jsx"
import { BookIndex } from './pages/book-index.jsx';
import { BookDetails } from "./pages/book-details.jsx"




export function App() {
    // const [page, setPage] = useState('book')
    // console.log('page is', page)

    return <Router>
                <section className="app">
                    <AppHeader/>
                    <main className="move">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<AboutUs />} path="/about" >
                                <Route element={<AboutIndex />} path="/about" />
                                <Route element={<Team />} path="/about/team" />
                                <Route element={<Vision />} path="/about/vision" />
                            </Route>
                            <Route element={<BookIndex />} path="/books" />
                            <Route element={<BookEdit />} path="/books/edit" />
                            <Route element={<BookEdit />} path="/books/edit/:bookId" />
                            <Route element={<BookDetails />} path="/books/:bookId" />

                        </Routes>
                    </main>
                    <UserMsg />
                </section>
            </Router>
}