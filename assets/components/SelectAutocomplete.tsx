import { Fragment, useState } from 'react';
import { CircularProgress, TextField, Autocomplete } from '@mui/material';

export default function SelectAutocomplete(props: any) {
    const { options, label, onChange, value, isDisabled, loading } = props;
    const [open, setOpen] = useState(false);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(e, value) => onChange(e, value)}
            value={value || null}
            disabled={isDisabled}
            disablePortal
            options={options}
            loading={loading}
            fullWidth
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading && open ? <CircularProgress color='inherit' size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        )
                    }}
                />
            }
        />
    );
}
