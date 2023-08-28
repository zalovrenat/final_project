import React, {useState, useEffect} from 'react'

const LineItem = ({index, lineItem, setLineItem, addElement, removeElement}) => {

    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState()

    useEffect(()=>{
        setLineItem((prev)=>{
            prev[index] = {type:type,date:date,description:description,amount:parseFloat(amount)}
            return prev
        })
    },[type, date, description, amount])

    return (
        <div className="my-2">
            <div key={`expenseType${index}`} className="select is-rounded is-multiple mx-2" required>
                <select onChange={({target:{value}})=>{setType(value)}}>
                    <option value="" disabled selected>Select Expense Line Type</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Rent and Utilities">Rent and Utilities</option>
                    <option value="Employee Salaries and Benefits">Employee Salaries and Benefits</option>
                    <option value="Travel and Accommodation">Travel and Accommodation</option>
                    <option value="Marketing and Advertising">Marketing and Advertising</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Insurance">Meals</option>
                    <option value="Insurance">Tax</option>
                    <option value="Professional Services (Legal, Accounting, etc.)">Professional Services (Legal, Accounting, etc.)</option>
                    <option value="Software and Technology (Hosting, Subscriptions, etc.)">Software and Technology (Hosting, Subscriptions, etc.)</option>
                </select>
            </div>
            <input key={`expenseDate${index}`} className="mx-2 not-bulma" type="date" placeholder="Expense Line Date" onChange={({target:{value}})=>{setDate(value)}} value={date} required />
            <input key={`expenseDescription${index}`} className="mx-2 not-bulma" type="text" placeholder="Expense Line Description" onChange={({target:{value}})=>{setDescription(value)}} value={description} required />
            <input key={`expenseAmount${index}`} className="mx-2 not-bulma" type="number" placeholder="Expense Line Amount" onChange={({target:{value}})=>{setAmount(value)}} value={amount} required />
            <button className="button is-rounded is-primary mx-2" onClick={addElement} ><strong>+</strong></button>
            <button className="button is-rounded is-danger mx-2" onClick={removeElement} ><strong>-</strong></button>
        </div>
    )
}

export default LineItem