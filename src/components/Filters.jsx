import React from 'react';

function Filters({ filterCriteria, setFilterCriteria, dynamicOptions }) {
    const toggleFilter = (key, value) => {
        setFilterCriteria((prev) => ({
            ...prev,
            [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
        }));
    };

    return (
        <div className="d-flex mb-3">
            <div className="me-3">
                <h5>날짜</h5>
                {dynamicOptions.months.map((month) => (
                    <label key={month} className="me-2">
                        <input
                            type="checkbox"
                            checked={filterCriteria.months.includes(month)}
                            onChange={() => toggleFilter('months', month)}
                        />
                        {month}
                    </label>
                ))}
            </div>
            <div className="me-3">
                <h5>입금자</h5>
                {dynamicOptions.payers.map((payer) => (
                    <label key={payer} className="me-2">
                        <input
                            type="checkbox"
                            checked={filterCriteria.payers.includes(payer)}
                            onChange={() => toggleFilter('payers', payer)}
                        />
                        {payer}
                    </label>
                ))}
            </div>
            <div>
                <h5>카테고리</h5>
                {dynamicOptions.categories.map((category) => (
                    <label key={category} className="me-2">
                        <input
                            type="checkbox"
                            checked={filterCriteria.categories.includes(category)}
                            onChange={() => toggleFilter('categories', category)}
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Filters;
