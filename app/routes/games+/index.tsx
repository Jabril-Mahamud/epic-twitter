import React from 'react';
import { Link } from 'react-router-dom';

export default function Games() {
    return (
        <div className="page-container">
            <h1>Games</h1>
            <p>Welcome to the Games page!</p>
            <Link to="/users">Go to Users</Link>
        </div>
    );
};

