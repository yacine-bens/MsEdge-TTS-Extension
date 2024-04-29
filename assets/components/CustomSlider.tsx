import { Box, Typography, Slider } from "@mui/material";

export default function CustomSlider(props: any) {
    const { onChange, label, value, labels } = props;

    return (
        <Box paddingInline={2}>
            <Typography textAlign={'center'}>{label}</Typography>
            <Slider
                value={value}
                defaultValue={0}
                step={null}
                track={false}
                valueLabelDisplay='off'
                marks={[
                    { value: 0, label: labels[0] },
                    { value: 20, label: labels[1] },
                    { value: 40, label: labels[2] },
                    { value: 60, label: labels[3] },
                    { value: 80, label: labels[4] },
                    { value: 100, label: labels[5] }
                ]}
                onChange={onChange}
            />
        </Box>
    );
};