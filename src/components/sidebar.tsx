import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PREFIX } from 'config/constants';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { Typography } from '@mui/material';

export const SideBar = (props) => {
    return (
        <Menu {...props}>
            <ListItemButton
                component={Link}
                to={`/${PREFIX}/specialities`}
                style={{ display: 'flex' }}
            >
                <FolderSpecialIcon />
                <Typography style={{ marginLeft: 5 }}>Specialities</Typography>
            </ListItemButton>
        </Menu>
    );
};
