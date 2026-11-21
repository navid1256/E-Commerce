import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-brand">
                        ShopHub
                    </Link>
                </div>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/checkout" className="navbar-link">Cart</Link>

                </div>
                <div className="navbar-auth">
                    {!user ? <div className='navbar-auth links'>
                        <Link to="/auth" className='btn btn-primary'>Signup</Link>
                        <Link to="/auth" className='btn btn-secondary'>Login</Link>
                    </div> : (
                        <div className='navbar-user'>
                            <span>Hello, {user.email}</span>
                            <button className='btn btn-secendary' onClick={logout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}