import React from 'react';

const ExpenseList = ({ expenses }) => {
    return (
        <div className="card" style={{ marginTop: '2rem' }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Recent Transactions</h2>

            {expenses.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                    No transactions yet. Start by adding one!
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                backgroundColor: 'var(--background-color)',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{expense.description}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                    {new Date(expense.createdAt).toLocaleDateString()} • {expense.category}
                                </div>
                            </div>
                            <div style={{
                                fontWeight: 700,
                                fontSize: '1.25rem',
                                color: expense.type === 'income' ? '#10b981' : '#ef4444'
                            }}>
                                {expense.type === 'income' ? '+' : '-'}{parseFloat(expense.amount).toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
