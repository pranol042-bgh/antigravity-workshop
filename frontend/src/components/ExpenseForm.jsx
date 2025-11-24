import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('expense');
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
                body: JSON.stringify({ description, amount, category, type }),
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
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Type</label>
                    <select
                        className="input-field"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setCategory(''); // Reset category when type changes
                        }}
                        required
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="input-group">
                    <label className="input-label">Description</label>
                    <input
                        type="text"
                        className="input-field"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={type === 'income' ? 'e.g. Salary' : 'e.g. Lunch at Cafe'}
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
                        {type === 'expense' ? (
                            <>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Other">Other</option>
                            </>
                        ) : (
                            <>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investment">Investment</option>
                                <option value="Gift">Gift</option>
                                <option value="Other">Other</option>
                            </>
                        )}
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
