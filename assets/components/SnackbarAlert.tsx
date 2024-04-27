import { Snackbar, Alert, CircularProgress, Slide, SlideProps } from "@mui/material";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

export default function SnackbarAlert(props: any) {
    const { open, alert, onClose } = props;

    return (
        <Snackbar
            open={open}
            autoHideDuration={alert.duration}
            onClose={onClose}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                severity={alert.severity}
                variant='filled'
                sx={{ width: '100%' }}
                onClose={onClose}
                icon={alert.icon === 'circular-progress' ? <CircularProgress size={24} color='inherit' /> : null}
            >
                {alert.msg}
            </Alert>
        </Snackbar>
    );
}