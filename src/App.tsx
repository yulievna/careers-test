import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (text: string) => {
        setSearchText(text);
    };

    return (
        <div className='page'>
            <Header onSearchChange={handleSearchChange}/>
            <main>
                <Outlet context={{ searchText }} />
            </main>
            <Footer/>
        </div>
    );
}

export default App;
