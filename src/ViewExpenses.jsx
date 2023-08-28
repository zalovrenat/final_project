import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, remove } from "firebase/database"

const ViewExpenses = ({ user }) => {

    const [userExpenses, setUserExpenses] = useState({})
    const [expense, setExpense] = useState(undefined)
    const [selectedImageURL, setSelectedImageURL] = useState('')

    useEffect(() => {
        const db = getDatabase();
        const expensesRef = ref(db, 'expenses/' + user.id);

        const listener = onValue(expensesRef, (snapshot) => {
            const expensesData = snapshot.val();
            if (expensesData) {
                setUserExpenses(expensesData)
            }
        })
    }, [user.id])

    const deleteExpense = async (key) => {

        const db = getDatabase();
        const expenseRef = ref(db, `expenses/${user.id}/${key}`)

        try {
            await remove(expenseRef, key)
            console.log('Expense removed successfully')

            setUserExpenses((prevExpenses) => {
                const updatedExpenses = { ...prevExpenses }
                delete updatedExpenses[key]
                return updatedExpenses
            });
        }
        catch (error) {
            console.error('Error removing expense:', error)
        }
    }

    const getTotal = () => {
        let total = 0
        console.log(total)
        for (let key in userExpenses) {
            total += userExpenses[key].total
        }
        console.log(total)
        return total
    }

    const openImageModal = (imageURL) => {
        setSelectedImageURL(imageURL)
        imageModal.classList.add('is-active')
    }

    const openExpenseModal = (expense) => {
        setExpense(expense)
        expenseModal.classList.add('is-active')
        console.log(expense)
    }

    const closeImageModal = () => {
        imageModal.classList.remove('is-active')
        setSelectedImageURL('')
    }

    const closeExpenseModal = () => {
        setExpense(undefined)
        expenseModal.classList.remove('is-active')
    }

    const closeAllModals = () => {
        closeImageModal()
        closeExpenseModal()
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeAllModals()
        }
    })

    return (
        <div>
            <body className="img" style={{ 'background-image': 'url(/assets/bg.jpg)' }}>
                <div className="row m-4 header">Total: ${getTotal()}</div>
                <div className="row mx-4">
                    {Object.keys(userExpenses).map((key) => (
                        <div className="column is-one-fifth">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <a onClick={() => openImageModal(userExpenses[key].url)} >
                                            <img src={userExpenses[key].url} alt="Placeholder image" />
                                        </a>
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <div className="row">
                                            <div className="column is-two-fifths">
                                                <amount>Total Amount:</amount>
                                            </div>
                                            <div className="column is-three-fifths">
                                                <amount>${userExpenses[key].total}</amount>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="column is-two-fifths">
                                                <amount>File Date:</amount>
                                            </div>
                                            <div className="column is-three-fifths">
                                                <amount>{userExpenses[key].dateCreated}</amount>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="column is-two-fifths">
                                                <amount># of Line Items:</amount>
                                            </div>
                                            <div className="column is-three-fifths">
                                                <amount>{userExpenses[key].numLines}</amount>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a onClick={() => openExpenseModal(userExpenses[key])} className="card-footer-item">View</a>
                                    <a className="card-footer-item">Edit</a>
                                    <a onClick={() => deleteExpense(key)} className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="imageModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <p className="image">
                            <img src={selectedImageURL} alt="" />
                        </p>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={closeImageModal} ></button>
                </div>
                <div id="expenseModal" className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <p className="image is-fullwidth">
                            {expense ? <img src={expense.url} alt="" /> : <></>}
                        </p>
                    </div>
                    <div className="modal-card">
                        <section className="modal-card-body">
                            <div className="modal-card-title py-1">Expense Details</div>
                            <div className="modal-card-body row py-0">
                                <div className="column is-half pb-1">Submitted On:</div>
                                <div className="column is-half pb-1">{expense ? expense.dateCreated : ""}</div>
                            </div>
                            <div className="modal-card-body row py-0">
                                <div className="column is-half py-1">Total Amount:</div>
                                <div className="column is-half py-1">${expense ? expense.total : ""}</div>
                            </div>
                            <div className="modal-card-body row py-0" >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td><abbr title="Expense Line #">Line #</abbr></td>
                                            <td><abbr title="Expense Line Date">Date</abbr></td>
                                            <td><abbr title="Expense Line Description">Description</abbr></td>
                                            <td><abbr title="Expense Line Type">Category</abbr></td>
                                            <td><abbr title="Expense Line Amount">Amount</abbr></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expense ? expense.lineItems.map((line, index) => (
                                            <tr>
                                                <th>{index + 1}</th>
                                                <td>{line.date}</td>
                                                <td>{line.description}</td>
                                                <td>{line.type}</td>
                                                <td>${line.amount}</td>
                                            </tr>)) : <></>}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={closeExpenseModal} ></button>
                </div>
            </body>
        </div>
    )
}

export default ViewExpenses