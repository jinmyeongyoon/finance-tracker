import React, { useState } from 'react';

function AddTransactionModal({ onAdd, onClose }) {
    const [formData, setFormData] = useState({
        date: '',
        payer: '',
        category: '',
        amount: '',
    });

    const formatAmount = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/[^0-9]/g, '');
        return parseInt(numericValue, 10).toLocaleString('ko-KR');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            const formattedAmount = formatAmount(value);
            setFormData((prev) => ({ ...prev, [name]: formattedAmount }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({
            ...formData,
            amount: parseInt(formData.amount.replace(/,/g, ''), 10),
            isPaid: false,
            id: Math.random().toString(36).substr(2, 9),
        });
        onClose();
    };

    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">거래 추가</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">날짜</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">입금자</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="payer"
                                    value={formData.payer}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">카테고리</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">금액</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="amount"
                                    value={`${formData.amount} 원`}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                추가
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTransactionModal;
