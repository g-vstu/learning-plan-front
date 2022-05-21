import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { SideBar } from './sidebar';

export const Layout: React.FC<any> = ({ children }) => {
    return (
        <div id="container">
            <SideBar pageWrapId={'page-wrap'} outerContainerId={'container'} />
            {/*<AppBar>
                <Toolbar style={{ border: '2px solid red', display: 'flex' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <Typography variant="h6">Photos</Typography>
                        <Typography variant="h6">Photos</Typography>
                        <Typography variant="h6">Photos</Typography>
                    </div>
                </Toolbar>
    </AppBar>*/}
            <div id="page-wrap">{children}</div>
        </div>
    );
};
