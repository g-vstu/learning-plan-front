import React from 'react';
import { SideBar } from './sidebar';

export const Layout: React.FC<any> = ({ children }) => {
    return (
        <div id="container">
            <SideBar pageWrapId={'page-wrap'} outerContainerId={'container'} />
            <div id="page-wrap">{children}</div>
        </div>
    );
};
