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
import { useAuth } from '../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';

export const SideBar = (props) => {
    const { user, signOut } = useAuth();
    const handleExit = () => {
        signOut(() => {
            localStorage.removeItem('user');
            window.history.replaceState({}, '', '/umo');
            window.location.href = '/umo';
        });
    };
    return (
        <Menu {...props}>
            {user ? (
                <Typography>{user.fio.split(' ').reverse().join(' ')}</Typography>
            ) : (
                <Typography>Авторизуйтесь</Typography>
            )}
            <ListItemButton
                component={Link}
                to={`/${PREFIX}/specialities`}
                style={{ display: 'flex', marginTop: 20 }}
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
            {user && (
                <ListItemButton
                    style={{ display: 'flex', marginTop: 20 }}
                    onClick={() => handleExit()}
                >
                    <LogoutIcon />
                    <Typography style={{ marginLeft: 5 }}>Выйти</Typography>
                </ListItemButton>
            )}
        </Menu>
    );
};
