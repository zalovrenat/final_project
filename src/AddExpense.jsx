import React, { useState, useEffect } from 'react'
import { getDatabase, ref as dRef, push } from "firebase/database"
import { getDownloadURL, ref as sRef, getStorage, uploadBytes } from 'firebase/storage'
import LineItem from './LineItem'

const AddExpense = ({ user }) => {

    const [lineItem, setLineItem] = useState([{ type: undefined, date: undefined, description: undefined, amount: undefined }])
    const [file, setFile] = useState(null)

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
    }

    useEffect(() => {
        if (file) {
            console.log(file.name)
        }
    }, [file]);

    const uploadFile = async (user) => {
        if (file) {
            const storage = getStorage()
            const storageRef = sRef(storage, `${user.id}/${file.name}`)

            try {
                await uploadBytes(storageRef, file)
                const url = await getDownloadURL(storageRef);
                console.log(typeof url)
                console.log("Download URL:", url)
                return url
            } catch (error) {
                console.error("Error uploading the file:", error)
            }
        }
    }

    const addElement = (event) => {
        event.preventDefault();
        setLineItem([...lineItem, { type: undefined, date: undefined, description: undefined, amount: undefined }])
        // console.log(receipt.files[0].name)
    }

    const removeElement = (event) => {
        event.preventDefault();
        if (lineItem.length > 1) {
            const copy = [...lineItem]
            copy.splice(copy.length - 1, 1)
            setLineItem(copy)
        }
        else {
            setLineItem([{ type: undefined, date: undefined, description: undefined, amount: undefined }])
        }
    }

    const addToDB = async () => {

        const url = await uploadFile(user)

        const currentDate = new Date()
        const myDate = currentDate.toLocaleString("en-US")
        const timestamp = currentDate.getTime()

        const db = getDatabase();
        const expenseRef = dRef(db, `expenses/${user.id}`)
        let total = 0
        for (let item of lineItem) {
            total += item.amount
        }
        const newExpense = {
            'total': parseFloat(total.toFixed(2)),
            'dateCreated': myDate,
            'dateCreatedTimestamp': timestamp,
            'lineItems': lineItem,
            'numLines': lineItem.length,
            'url': url
        }
        console.log(newExpense)
        try {
            await push(expenseRef, newExpense)
            console.log('New expense added successfully')
        }
        catch (error) {
            console.error('Error adding new expense:', error)
        }
    }

    return (
        <div>
            <body className="img" style={{ 'background-image': 'url(/assets/bg.jpg)' }}>
                <div className="column is-9 is-offset-2">
                    <div classname="row">
                        <div className="column is-4">
                            <div className="file has-name is-fullwidth">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="resume" onChange={handleFileChange}/>
                                        <span className="file-cta">
                                            <span className="file-icon">
                                                <i className="fas fa-upload"></i>
                                            </span>
                                            <span className="file-label">
                                                Upload Receipt
                                            </span>
                                        </span>
                                        <span className="file-name color-white">
                                            {file ? file.name : 'File Name'}
                                        </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form>
                            {lineItem.map((_, index) => (
                                <LineItem key={index} index={index} setLineItem={setLineItem} addElement={addElement} removeElement={removeElement} />
                            ))}
                            {/* <button className="button is-rounded is-primary" onClick={addElement}><strong>+</strong></button>
                            <button className="button is-rounded is-danger" onClick={removeElement}><strong>-</strong></button> */}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="column is-6 is-offset-5">
                        <button className="button is-rounded is-main" onClick={addToDB} type="submit" ><strong>Submit Expense</strong></button>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default AddExpense