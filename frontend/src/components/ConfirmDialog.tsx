import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    isError?: boolean; // Añadimos este prop para determinar si es un mensaje de error
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    message,
    isError = false, // Valor por defecto false
    onClose,
    onConfirm
}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: { padding: '15px', borderRadius: '10px' },
            }}
        >
            <DialogTitle>
                <Typography
                    variant="h6"
                    component="div"
                    style={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    style={{
                        fontSize: '1rem',
                        textAlign: 'center',
                        margin: '15px 0',
                        color: isError ? 'red' : 'inherit'
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="primary"
                    style={{
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        borderRadius: '8px'
                    }}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;