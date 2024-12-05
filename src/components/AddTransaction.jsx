import React, { useState } from 'react';

function AddTransaction({ onAdd }) {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [payer, setPayer] = useState('');
    const [category, setCategory] = useState('');

    // 금액 입력 시 쉼표 추가
    const formatNumberWithCommas = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, ''); // 기존 쉼표 제거
        if (!isNaN(rawValue)) {
            setAmount(formatNumberWithCommas(rawValue)); // 쉼표 추가된 값 저장
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount || !date || !payer || !category) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        // 쉼표를 제거하고 순수 숫자로 변환하여 저장
        const numericAmount = parseInt(amount.replace(/,/g, ''), 10);

        onAdd({
            amount: numericAmount,
            date,
            payer,
            category,
        });

        // 입력 필드 초기화
        setAmount('');
        setDate('');
        setPayer('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>금액:</label>
                <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="금액을 입력하세요"
                />
            </div>
            <div>
                <label>날짜:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>입금자:</label>
                <input
                    type="text"
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                    placeholder="입금자를 입력하세요"
                />
            </div>
            <div>
                <label>카테고리:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">선택</option>
                    <option value="식품">식품</option>
                    <option value="가전">가전</option>
                    <option value="뷰티">뷰티</option>
                    <option value="패션">패션</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <button type="submit">추가</button>
        </form>
    );
}

export default AddTransaction;
