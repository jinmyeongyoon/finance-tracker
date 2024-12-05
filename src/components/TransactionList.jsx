import React, { useState, useMemo } from 'react';

function TransactionList({
    transactions,
    totalAmount,
    completedAmount,
    pendingAmount,
    onTogglePaid,
    onSort,
    filterCriteria,
    setFilterCriteria,
    dynamicOptions,
    onDelete,
}) {
    const [dropdownState, setDropdownState] = useState({
        date: false,
        payer: false,
        category: false,
    });

    const toggleDropdown = (key) => {
        setDropdownState((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleFilterChange = (key, value) => {
        setFilterCriteria((prev) => {
            const updatedCriteria = prev[key].includes(value)
                ? prev[key].filter((item) => item !== value) // 선택 해제
                : [...prev[key], value]; // 선택 추가
            return { ...prev, [key]: updatedCriteria };
        });
    };

    // 날짜 드롭다운 항목 생성 및 정렬 (YYYY-MM 형식)
    const formattedMonths = useMemo(() => {
        return Array.from(
            new Set([...dynamicOptions.months, ...filterCriteria.months]) // 기존 선택 항목도 포함
        ).sort();
    }, [dynamicOptions.months, filterCriteria.months]);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    {/* 첫 번째 행 */}
                    <tr>
                        <th>#</th>
                        <th>
                            날짜
                            <button
                                onClick={() => toggleDropdown('date')}
                                className="btn btn-sm btn-outline-secondary ms-2"
                                style={{ border: 'none' }}
                            >
                                ▼
                            </button>
                            {dropdownState.date && (
                                <div className="dropdown-menu show">
                                    {formattedMonths.map((month) => (
                                        <label key={month} className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                checked={filterCriteria.months.includes(month)}
                                                onChange={() => handleFilterChange('months', month)}
                                                className="me-2"
                                            />
                                            {month}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </th>
                        <th>
                            입금자
                            <button
                                onClick={() => toggleDropdown('payer')}
                                className="btn btn-sm btn-outline-secondary ms-2"
                                style={{ border: 'none' }}
                            >
                                ▼
                            </button>
                            {dropdownState.payer && (
                                <div className="dropdown-menu show">
                                    {dynamicOptions.payers.map((payer) => (
                                        <label key={payer} className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                checked={filterCriteria.payers.includes(payer)}
                                                onChange={() => handleFilterChange('payers', payer)}
                                                className="me-2"
                                            />
                                            {payer}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </th>
                        <th>
                            카테고리
                            <button
                                onClick={() => toggleDropdown('category')}
                                className="btn btn-sm btn-outline-secondary ms-2"
                                style={{ border: 'none' }}
                            >
                                ▼
                            </button>
                            {dropdownState.category && (
                                <div className="dropdown-menu show">
                                    {dynamicOptions.categories.map((category) => (
                                        <label key={category} className="dropdown-item">
                                            <input
                                                type="checkbox"
                                                checked={filterCriteria.categories.includes(category)}
                                                onChange={() => handleFilterChange('categories', category)}
                                                className="me-2"
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </th>
                        <th>금액</th>
                        <th>입금 상태</th>
                        <th>삭제</th>
                    </tr>

                    {/* 두 번째 행 */}
                    <tr>
                        <th>총 {transactions.length} 개</th>
                        <th>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => onSort('date')}>
                                날짜순
                            </button>
                        </th>
                        <th>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => onSort('payer')}>
                                입금자순
                            </button>
                        </th>
                        <th>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => onSort('category')}>
                                카테고리순
                            </button>
                        </th>
                        <th>
                            <strong>총합: {totalAmount.toLocaleString()} 원</strong>
                        </th>
                        <th>
                            <strong>
                                {completedAmount.toLocaleString()} 원 / {pendingAmount.toLocaleString()} 원
                            </strong>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.payer}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.amount.toLocaleString()} 원</td>
                            <td>
                                <button
                                    onClick={() => onTogglePaid(transaction.id)}
                                    className={`btn btn-sm ${transaction.isPaid ? 'btn-success' : 'btn-danger'}`}
                                >
                                    {transaction.isPaid ? '입금 완료' : '입금 미완료'}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => onDelete(transaction.id)} className="btn btn-sm btn-danger">
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionList;
