import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export default function VoiceAppBar(props: any) {
    const { voice } = props;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color='info' elevation={1} position="static">
                <Toolbar>
                    <RecordVoiceOverIcon />
                    <Typography component="div" sx={{ flexGrow: 1 }}> {voice} </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}