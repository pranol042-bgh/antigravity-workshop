import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount || !category) return;

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, amount, category }),
            });

            if (response.ok) {
                const newExpense = await response.json();
                onAddExpense(newExpense);
                setDescription('');
                setAmount('');
                setCategory('');
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Add New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Description</label>
                    <input
                        type="text"
                        className="input-field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Lunch at Cafe"
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Amount (THB)</label>
                    <input
                        type="number"
                        className="input-field"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Category</label>
                    <select
                        className="input-field"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
