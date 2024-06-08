import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { IconButton, Stack, Typography } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import CustomSlider from './CustomSlider';

export default function TemporaryDrawer(props: any) {
    const { open, toggleDrawer, settings, handleSliderChange } = props;

    const DrawerContent = (
        <Box>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ m: 1 }}
                onClick={() => toggleDrawer(false)}
            >
                <ArrowBackIosNew />
            </IconButton>
            <Stack spacing={2} sx={{ mx: 2 }}>
                <Typography sx={{ textAlign: 'center' }} variant='h6'>Additional Settings</Typography>
                <CustomSlider value={settings.rate} labels={['default', 'x-slow', 'slow', 'medium', 'fast', 'x-fast']} label='Rate' onChange={(e: any, value: number) => handleSliderChange(value, 'set_rate')} />
                <CustomSlider value={settings.pitch} labels={['default', 'x-low', 'low', 'medium', 'high', 'x-high']} label='Pitch' onChange={(e: any, value: number) => handleSliderChange(value, 'set_pitch')} />
            </Stack>
            <Divider />
        </Box>
    );

    return (
        <div>
            <Drawer
                open={open}
                onClose={() => toggleDrawer(false)}
                PaperProps={{
                    sx: { width: '100%' }
                }}
            >
                {DrawerContent}
            </Drawer>
        </div>
    );
}
