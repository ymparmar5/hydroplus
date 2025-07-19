import React, { useContext } from 'react';
import ProductDetail from './ProdcutDetail';
import myContext from '../../Context/myContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllProduct } = context;

    const containerStyle = {
        minHeight: '80vh',
        background: 'var(--background)',
        color: 'var(--text)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const userInfoStyle = {
        background: 'var(--surface)',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        padding: '2rem',
        margin: '1.5rem 0',
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const userPhotoStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '1rem',
        border: '2px solid var(--primary)',
    };
    const detailsStyle = {
        marginBottom: '1rem',
        textAlign: 'center',
    };
    const buttonStyle = {
        background: 'var(--primary)',
        color: 'var(--text-light)',
        border: 'none',
        borderRadius: '6px',
        padding: '0.7rem 1.5rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'background 0.2s',
    };
    const productInfoStyle = {
        width: '100%',
        marginTop: '2rem',
        maxWidth: '900px',
    };
    return (
        <div style={containerStyle}>
            <div style={userInfoStyle}>
                <img style={userPhotoStyle} src="/admin.png" alt="User" />
                <div style={detailsStyle}>
                    <h1><span style={{ fontWeight: 700 }}>Name: </span>{user?.name}</h1>
                    <h1><span style={{ fontWeight: 700 }}>Email: </span>{user?.email}</h1>
                    <h1><span style={{ fontWeight: 700 }}>Role: </span>{user?.role}</h1>
                </div>
                <Link to={'/AddProductPage'}>
                    <button style={buttonStyle}>Add Product</button>
                </Link>
            </div>
            <div style={productInfoStyle}>
                <div>
                    <ProductDetail />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
