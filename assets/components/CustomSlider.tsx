import { Box, Typography, Slider } from "@mui/material";

export default function CustomSlider(props: any) {
    const { onChange, label, value, labels, min, max, defaultValue } = props;

    return (
        <Box paddingInline={2}>
            <Typography textAlign={'center'}>{label}</Typography>
            <Slider
                value={value}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={1}
                track={false}
                valueLabelDisplay='auto'
                valueLabelFormat={(value) => (value >= 0 ? '+' + value : value) + '%'}
                marks={[
                    { value: min, label: labels[0] },
                    { value: defaultValue, label: labels[1] },
                    { value: max, label: labels[2] },
                ]}
                onChange={onChange}
            />
        </Box>
    );
};