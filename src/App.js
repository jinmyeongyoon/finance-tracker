import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BudgetApp from './components/BudgetApp';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/budget" element={<BudgetApp />} />
            </Routes>
        </Router>
    );
}

export default App;
