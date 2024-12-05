import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import CalendarView from './CalendarView';
import AddTransactionModal from './AddTransactionModal';

function BudgetApp() {
    const [transactions, setTransactions] = useState(() => {
        // 초기 로컬스토리지 데이터 로드
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
    const [isCalendarView, setIsCalendarView] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        months: [],
        payers: [],
        categories: [],
    });
    const [sortKey, setSortKey] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // 로컬스토리지에 거래 저장
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesMonths =
            filterCriteria.months.length === 0 || filterCriteria.months.includes(transaction.date.slice(0, 7));
        const matchesPayers = filterCriteria.payers.length === 0 || filterCriteria.payers.includes(transaction.payer);
        const matchesCategories =
            filterCriteria.categories.length === 0 || filterCriteria.categories.includes(transaction.category);

        return matchesMonths && matchesPayers && matchesCategories;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey === 'date') return new Date(a.date) - new Date(b.date);
        if (sortKey === 'payer') return a.payer.localeCompare(b.payer);
        if (sortKey === 'category') return a.category.localeCompare(b.category);
        return 0;
    });

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const completedAmount = transactions.filter((t) => t.isPaid).reduce((sum, t) => sum + t.amount, 0);
    const pendingAmount = totalAmount - completedAmount;

    const handleTogglePaid = (id) => {
        setTransactions((prev) =>
            prev.map((transaction) =>
                transaction.id === id ? { ...transaction, isPaid: !transaction.isPaid } : transaction
            )
        );
    };

    const handleDeleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    };

    const dynamicOptions = {
        months: Array.from(new Set(transactions.map((t) => t.date.slice(0, 7)))).sort(),
        payers: Array.from(new Set(transactions.map((t) => t.payer))),
        categories: Array.from(new Set(transactions.map((t) => t.category))),
    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-3">
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4A4A4A' }}>크리스망스의 수금장부😽</h2>
            </div>

            <div className="d-flex justify-content-center mb-4" style={{ gap: '10px' }}>
                <button
                    className="btn"
                    onClick={() => setShowModal(true)}
                    style={{
                        backgroundColor: '#DFD3C3',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    거래 추가
                </button>
                <button
                    className="btn"
                    onClick={() => setIsCalendarView(!isCalendarView)}
                    style={{
                        backgroundColor: isCalendarView ? '#462679' : '#462679',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    {isCalendarView ? '표로 보기' : '달력으로 보기'}
                </button>
            </div>

            {isCalendarView ? (
                <CalendarView transactions={sortedTransactions} />
            ) : (
                <TransactionList
                    transactions={sortedTransactions}
                    totalAmount={totalAmount}
                    completedAmount={completedAmount}
                    pendingAmount={pendingAmount}
                    onTogglePaid={handleTogglePaid}
                    onSort={setSortKey}
                    filterCriteria={filterCriteria}
                    setFilterCriteria={setFilterCriteria}
                    dynamicOptions={dynamicOptions}
                    onDelete={handleDeleteTransaction}
                />
            )}

            {showModal && (
                <AddTransactionModal
                    onAdd={(transaction) => setTransactions((prev) => [...prev, transaction])}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default BudgetApp;
