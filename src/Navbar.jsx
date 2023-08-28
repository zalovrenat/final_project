import React from 'react'
import user from './App'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ setUser, user }) => {

    const navigate = useNavigate()

    const logout = (event) => {
        event.preventDefault()
        setUser({})
        navigate('/login')
    }

    return (
        <div>
            <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/main">
                        <i className="fa-solid fa-dollar-sign" />
                        <span>pendWise</span>
                    </Link>
                </div>

                <div className="navbar-menu">
                    {user.email ?
                        <div className="navbar-start">

                            <Link className="navbar-item" to="/addExpense">
                                Add Expense
                            </Link>

                            <Link className="navbar-item" to="/viewExpenses">
                                View Expenses
                            </Link>

                        </div> : <></>}

                    <div className="navbar-end">
                        {user.email ? <></> :
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-link is-rounded" href="/signup">
                                        <strong>Sign Up</strong>
                                    </a>
                                </div>
                            </div>}
                        {user.email ? <></> :
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary is-rounded" href="/login">
                                        <strong>Log In</strong>
                                    </a>
                                </div>
                            </div>}
                        {user.email ?
                            <div className="navbar-item has-dropdown is-right is-hoverable ">
                                <a className="navbar-link">
                                    Welcome, {user.name ? user.name : user.email}
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    <a className="navbar-item" onClick={logout} >
                                        Log Out
                                    </a>
                                </div>
                            </div> : <></>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar