import React from 'react';
import { Link } from 'react-router-dom';
import {useStore} from "../Store/Store";

const Toolbar = ({}) => {
    const bears = useStore((state) => state.bears);
    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.left}>
                    <h2 style={{ margin: 0, color: '#fff' }}>MyCompany</h2>
                    <h3>Bears: {bears}</h3>
                </div>
                <div style={styles.links}>
                    <Link style={styles.link} to="/">Home</Link>
                    <Link style={styles.link} to="/AboutUs">About</Link>
                    <Link style={styles.link} to="/Gallery">Gallery</Link>
                    <Link style={styles.link} to="/ProductPage">Products</Link>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#222',
        padding: '10px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    container: {
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
    },
    left: {
        display: 'flex',
        alignItems: 'center'
    },
    links: {
        display: 'flex',
        gap: '20px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
};

export default Toolbar;