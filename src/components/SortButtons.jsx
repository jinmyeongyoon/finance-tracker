import React from 'react';

function SortButtons({ setSortKey }) {
    return (
        <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-primary me-2" onClick={() => setSortKey('date')}>
                날짜순
            </button>
            <button className="btn btn-outline-primary me-2" onClick={() => setSortKey('payer')}>
                입금자순
            </button>
            <button className="btn btn-outline-primary" onClick={() => setSortKey('category')}>
                카테고리순
            </button>
        </div>
    );
}

export default SortButtons;
