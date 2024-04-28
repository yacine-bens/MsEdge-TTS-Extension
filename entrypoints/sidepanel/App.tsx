import { useEffect, useReducer } from 'react';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import SnackbarAlert from '@/assets/components/SnackbarAlert';
import SelectAutocomplete from '@/assets/components/SelectAutocomplete';
import useFetch from './useFetch';
import useTTS from './useTTS';

const voiceReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'select_language':
            return { language: action.value, country: '', voice: '' };
        case 'select_country':
            return { ...state, country: action.value, voice: '' };
        case 'select_voice':
            return { ...state, voice: action.value };
        default:
            return state;
    }
};

const textReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'set_text':
            return action.value;
        default:
            return state;
    }
};

const alertReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'close_alert':
            return { ...state, open: false };
        case 'voices_error':
            return { open: true, alert: { severity: 'error', msg: 'Error occured while loading voices' } };
        case 'audio_error':
            return { open: true, alert: { severity: 'error', msg: 'Error occured while generating audio' } };
        case 'generate_audio':
            return { open: true, alert: { severity: 'info', msg: 'Generating audio...', icon: 'circular-progress' } };
        default:
            return state;
    }
};

function App() {
    const [voiceState, voiceDispatch] = useReducer(voiceReducer, {
        language: '',
        country: '',
        voice: '',
    });

    const [text, textDispatch] = useReducer(textReducer, '');

    const [alertState, alertDispatch] = useReducer(alertReducer, {
        open: false,
        alert: {}
    });

    // Load data from server
    const [voicesLoading, voicesError, languages, countries, voices] = useFetch(voiceState);

    const { audioUrl, audioLoading, audioError, generateAudio } = useTTS();

    const handleChange = (value: string, type: string) => {
        if (!value) return;

        voiceDispatch({ type, value });
        alertDispatch({ type: 'close_alert' });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        textDispatch({ type: 'set_text', value: e.target.value });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        alertDispatch({ type: 'close_alert' });
    };

    const handleSubmit = () => {
        alertDispatch({ type: 'generate_audio' });
        generateAudio(text, voices[voiceState.voice]);
    }

    useEffect(() => {
        chrome.storage.session.onChanged.addListener((changes) => {
            for (let change in changes) {
                if (change === 'text' && changes[change].newValue) {
                    textDispatch({ type: 'set_text', value: changes[change].newValue });
                    chrome.storage.session.remove('text');
                }
            }
        });

        (async () => {
            const { text: storageText } = await chrome.storage.session.get('text');
            if (storageText) {
                textDispatch({ type: 'set_text', value: storageText });
                chrome.storage.session.remove('text');
            }
        })();
    }, []);

    useEffect(() => {
        if (audioUrl) {
            alertDispatch({ type: 'close_alert' });
        }
    }, [audioUrl]);

    useEffect(() => {
        if (voicesError) alertDispatch({ type: 'voices_error' });
        else if (audioError) alertDispatch({ type: 'audio_error' });
    }, [voicesError, audioError]);

    return (
        <>
            <Grid container margin={1} rowSpacing={2} columns={1}>
                <Grid xs={1}>
                    <SelectAutocomplete options={languages} label="Language" loading={voicesLoading} value={voiceState.language} onChange={(e: any, value: string) => handleChange(value, 'select_language')} />
                </Grid>
                <Grid xs={1}>
                    <SelectAutocomplete options={countries} label="Country" value={voiceState.country} onChange={(e: any, value: string) => handleChange(value, 'select_country')} isDisabled={!voiceState.language.length} />
                </Grid>
                <Grid xs={1}>
                    <SelectAutocomplete options={Object.keys(voices)} label="Voice" value={voiceState.voice} onChange={(e: any, value: string) => handleChange(value, 'select_voice')} isDisabled={!voiceState.country.length} />
                </Grid>
                <Grid xs={1}>
                    <TextField
                        value={text}
                        onChange={handleTextChange}
                        fullWidth
                        label='Text'
                        placeholder='Enter text to be spoken'
                        multiline
                        minRows={3}
                        maxRows={20}
                    />
                </Grid>
                <Grid xs={1}>
                    <Button
                        variant='contained'
                        sx={{ padding: '.75rem' }}
                        disabled={audioLoading || !voiceState.voice || !text.trim().length}
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Generate Audio
                    </Button>
                </Grid>
                <Grid xs={1}>
                    <audio src={audioUrl} autoPlay controls style={{ width: '100%' }}></audio>
                </Grid>
            </Grid>
            <SnackbarAlert open={alertState.open} alert={alertState.alert} onClose={handleClose} />
        </>
    );
}

export default App;