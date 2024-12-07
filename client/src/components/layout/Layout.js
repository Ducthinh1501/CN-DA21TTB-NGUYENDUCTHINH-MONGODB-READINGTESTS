// src/components/layout/Layout.js
import React from 'react';
import Navigation from './Navigation';
import { Container } from '@mui/material';

function Layout({ children }) {
    return (
        <>
            <Navigation />
            <Container>
                {children}
            </Container>
        </>
    );
}

export default Layout;