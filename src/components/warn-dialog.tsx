import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const WarnDialog = (props) => {
    const { title, children, open, setOpen } = props;
    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WarnDialog;
