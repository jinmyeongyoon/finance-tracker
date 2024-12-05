import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

// 카테고리 아이콘 매핑
const categoryIcons = {
    식품: '🍎',
    가전: '📺',
    뷰티: '💄',
    패션: '👗',
    기타: '📦',
};

function CalendarView({ transactions }) {
    const getTileContent = ({ date, view }) => {
        if (view === 'month') {
            // 해당 날짜의 거래 데이터 필터링
            const dailyTransactions = transactions.filter(
                (transaction) => new Date(transaction.date).toDateString() === date.toDateString()
            );

            if (dailyTransactions.length > 0) {
                return (
                    <div style={{ fontSize: '14px', textAlign: 'left' }}>
                        {dailyTransactions.map((transaction, index) => (
                            <div key={index} style={{ marginBottom: '5px' }}>
                                {/* 입금 상태에 따라 원형 색상 표시 */}
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: transaction.isPaid ? 'green' : 'red',
                                        borderRadius: '50%',
                                        marginRight: '5px',
                                    }}
                                ></span>
                                {`${(transaction.amount / 10000).toLocaleString()}만원 / ${
                                    transaction.payer
                                } / ${categoryIcons[transaction.category] || ''}`}
                            </div>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '1600px', margin: 'auto' }}>
            <Calendar
                tileContent={getTileContent}
                className="custom-calendar"
                calendarType="US" // 달력 유형 설정
                showWeekNumbers={false} // 주 번호 숨김
            />
        </div>
    );
}

export default CalendarView;
