useEffect(() => {
    const generateRandomData = () => {
        const randomCategories = ['식품', '가전', '뷰티', '패션', '기타'];
        const randomNames = ['홍길동', '김철수', '이영희', '박지민', '최유리'];
        const randomTransactions = Array.from({ length: 20 }, () => ({
            id: Math.random().toString(36).substr(2, 9),
            date: `2024-${String(Math.floor(Math.random() * 3) + 10).padStart(2, '0')}-${String(
                Math.floor(Math.random() * 28) + 1
            ).padStart(2, '0')}`,
            payer: randomNames[Math.floor(Math.random() * randomNames.length)],
            category: randomCategories[Math.floor(Math.random() * randomCategories.length)],
            amount: Math.floor(Math.random() * 300000) + 100000,
            isPaid: Math.random() > 0.5,
        }));
        setTransactions(randomTransactions);
    };
    generateRandomData();
}, []);
