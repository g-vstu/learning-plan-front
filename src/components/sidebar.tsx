import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PREFIX } from 'config/constants';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { Typography } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';
import SourceIcon from '@mui/icons-material/Source';

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
            <ListItemButton component={Link} to={`/${PREFIX}/subjects`} style={{ display: 'flex' }}>
                <SubjectIcon />
                <Typography style={{ marginLeft: 5 }}>Subjects</Typography>
            </ListItemButton>
            <ListItemButton component={Link} to={`/${PREFIX}/units`} style={{ display: 'flex' }}>
                <PictureInPictureIcon />
                <Typography style={{ marginLeft: 5 }}>Group Units</Typography>
            </ListItemButton>
            <ListItemButton component={Link} to={`/${PREFIX}/plans`} style={{ display: 'flex' }}>
                <SourceIcon />
                <Typography style={{ marginLeft: 5 }}>Plans</Typography>
            </ListItemButton>
        </Menu>
    );
};
