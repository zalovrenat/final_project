import React, { useState, useEffect } from 'react'
import LineItem from './LineItem'

const EditModal = ({ expense, closeModal, updateExpense }) => {

    const [lineItem, setLineItem] = useState(expense.lineItems)

    const saveChanges = async () => {

        const updatedExpense = { ...expense, lineItems: lineItem }
        await updateExpense(updatedExpense)
        closeModal()
    }

    return (
        <div>EditModal</div>
    )
}

export default EditModal