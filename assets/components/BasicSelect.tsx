import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props: any) {
    const { label, items, isDisabled, onChange, value } = props;
    
    return (
        <Box sx={{
            margin: '15px 0px',
        }}>
            <FormControl disabled={isDisabled} required fullWidth >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={items && items.length && value || ''}
                    label={label}
                    onChange={(e) => onChange(e.target.value)}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 360 } } }}
                >
                    {items.length && items.map((item: string | any, idx: number) => (<MenuItem key={idx} value={item.shortName || item}>{item.name || item}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    );
}