import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { PREFIX } from 'config/constants';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { Typography } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import SourceIcon from '@mui/icons-material/Source';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export const SideBar = (props) => {
    return (
        <Menu {...props}>
            <ListItemButton
                component={Link}
                to={`/${PREFIX}/specialities`}
                style={{ display: 'flex' }}
            >
                <FolderSpecialIcon />
                <Typography style={{ marginLeft: 5 }}>Специальности</Typography>
            </ListItemButton>
            {/*} <ListItemButton component={Link} to={`/${PREFIX}/subjects`} style={{ display: 'flex' }}>
                <SubjectIcon />
                <Typography style={{ marginLeft: 5 }}>Предметы</Typography>
            </ListItemButton>
            */}
            {/*<ListItemButton component={Link} to={`/${PREFIX}/units`} style={{ display: 'flex' }}>
                <PictureInPictureIcon />
                <Typography style={{ marginLeft: 5 }}>Модули</Typography>
             </ListItemButton>
             */}
            <ListItemButton component={Link} to={`/${PREFIX}/plans`} style={{ display: 'flex' }}>
                <SourceIcon />
                <Typography style={{ marginLeft: 5 }}>Планы</Typography>
            </ListItemButton>
            {/* <ListItemButton
                component={Link}
                to={`/${PREFIX}/competencies`}
                style={{ display: 'flex' }}
            >
                <ChatBubbleIcon />
                <Typography style={{ marginLeft: 5 }}>Компетенции</Typography>
            </ListItemButton>
            */}
        </Menu>
    );
};
