import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // CSS 파일 가져오기

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <img src={require('../assets/financehome.png')} alt="Home Illustration" className="home-image" />
            <h1>두근두근</h1>
            <p>이번달엔 얼마를 벌었을까?</p>
            <button className="home-button" onClick={() => navigate('/budget')}>
                크리스망스의 수금장부😽
            </button>
        </div>
    );
}

export default Home;
