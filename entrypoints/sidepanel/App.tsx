import { createRef, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import BasicSelect from '@/assets/components/BasicSelect';
import { Box, CircularProgress, Button, TextField } from '@mui/material';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import VoiceAppBar from '@/assets/components/VoiceAppBar';
import SnackbarAlert from '@/assets/components/SnackbarAlert';
import useFetch from './useFetch';
import useData from './useData';

const voiceReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'select_language':
            return { language: action.language, country: '', voice: '' };
        case 'select_country':
            return { ...state, country: action.country, voice: '' };
        case 'select_voice':
            // TODO: set storage (object: language + country, not only voice)
            return { ...state, voice: action.voice };
        default:
            return state;
    }
};

const textReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'text_change':
            return { ...state, value: action.value, valid: action.valid };
        case 'storage_text_change':
            return { ...state, value: action.value };
        case 'load_storage_text':
            return { ...state, value: action.value };
        case 'invalid_text':
            return { ...state, valid: false };
        case 'speak_start':
            return { ...state, pending: true };
        case 'speak_end':
            return { ...state, pending: false };
        default:
            return state;
    }
};

const alertReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'open_alert':
            return { ...state, open: true };
        case 'close_alert':
            return { ...state, open: false };
        case 'show_error':
            return { open: true, alert: { severity: 'error', msg: 'Error, please try again' } };
        default:
            return state;
    }
};

function App() {
    const DEFAULT_VOICE = 'en-US-AndrewNeural';

    const tts = new MsEdgeTTS();

    const [voiceState, voiceDispatch] = useReducer(voiceReducer, {
        language: '',
        country: '',
        voice: '',
    });

    const [textState, textDispatch] = useReducer(textReducer, {
        value: '',
        valid: true,
        pending: false,
    });

    const [alertState, alertDispatch] = useReducer(alertReducer, {
        open: false,
        alert: {}
    });

    // Load data from server
    const [voicesLoading, voicesError, languages, countries, voices] = useFetch(voiceState);

    // const [languages] = useData(getLanguages, [voicesData]);
    // const [countries] = useData(getCountries, [voiceState.language]);
    // const [voices] = useData(getVoices, [voiceState.language, voiceState.country]);
    
    const [currentVoice, setCurrentVoice] = useState('');

    const [text, setText] = useState('');
    const [textError, setTextError] = useState(false);
    const [pending, setPending] = useState(false);

    const audioElement = useRef<HTMLAudioElement | null>(null);

    const speakText = async (txt: string) => {
        // setPending(true);
        textDispatch({ type: 'speak_start' });

        const { voice: storageVoice } = await chrome.storage.local.get('voice');
        console.log('speaking voice:', storageVoice);

        await tts.setMetadata(storageVoice || DEFAULT_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
        const readable = tts.toStream(txt);
        let data64: any = '';

        readable.on('data', data => {
            data64 = Buffer.concat([Buffer.from(data64), Buffer.from(data)]);
        });

        readable.on('end', async () => {
            const blob = new Blob([data64], { type: 'audio/mpeg' });

            console.log(blob.size);

            if (blob.size && audioElement.current) {
                const audioURL = URL.createObjectURL(blob);
                audioElement.current!.src = audioURL;
                audioElement.current!.play();
            }

            await chrome.storage.session.remove('text');
            // setPending(false);
            textDispatch({ type: 'speak_end' });
        });
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setText(e.target.value);
        // setTextError(!e.target.validity.valid);
        textDispatch({ type: 'text_change', value: e.target.value, valid: e.target.validity.valid });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        // setSnackbarOpen(false);
        alertDispatch({ type: 'close_alert' });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(e.target as HTMLFormElement).checkValidity() || !text.trim().length) {
            // setTextError(true);
            textDispatch({ type: 'invalid_text' });
            return;
        }

        speakText(text)
            .catch(e => {
                console.log(e);
                // setPending(false);
                // showError();
                textDispatch({ type: 'speak_end' });
                alertDispatch({ type: 'show_error' });
            });
    }

    const showError = () => {
        alertDispatch({ type: 'show_error' });
        // setSnackbarAlert({ severity: 'error', msg: 'Error, please try again' });
        // setSnackbarOpen(true);
    };

    useEffect(() => {
        chrome.storage.session.onChanged.addListener((changes) => {
            for (let change in changes) {
                if (change === 'text' && changes[change].newValue) {
                    // setText(changes[change].newValue);
                    textDispatch({ type: 'storage_text_change', value: changes[change].newValue });
                    speakText(changes[change].newValue)
                        .catch(e => {
                            console.log(e);
                            // setPending(false);
                            textDispatch({ type: 'speak_end' });
                            alertDispatch({ type: 'show_error' });
                            // showError();
                        })
                }
            }
        });

        (async () => {
            const { voice: storageVoice } = await chrome.storage.local.get('voice');
            // setCurrentVoice(storageVoice || DEFAULT_VOICE);
            voiceDispatch({ type: 'load_storage_voice', voice: storageVoice });

            console.log('storageVoice:', storageVoice);

            const { text: storageText } = await chrome.storage.session.get('text');

            if (storageText) {
                // setText(storageText);
                textDispatch({ type: 'load_storage_text', value: storageText });
                speakText(storageText)
                    .catch(e => {
                        console.log(e);
                        // setPending(false);
                        // showError();
                        textDispatch({ type: 'speak_end' });
                        alertDispatch({ type: 'show_error' });
                    });
            }
        })();
    }, []);

    useEffect(() => {
        if (text.length) setTextError(false);
    }, [text]);

    return (
        <>
            <VoiceAppBar voice={currentVoice} />
            {/* <Box sx={{ boxShadow: 4, padding: 1, borderRadius: '10px' }}> */}
            <Box>
                <BasicSelect
                    onChange={(value: string) => voiceDispatch({ type: 'select_language', language: value })}
                    label={'Language'}
                    // TODO: update circular progress
                    items={voicesLoading ? [<CircularProgress sx={{ margin: '0 40%' }} color='inherit' size={28} />] : languages}
                    value={voiceState.language}
                />
                <BasicSelect
                    isDisabled={!voiceState.language.length}
                    onChange={(value: string) => voiceDispatch({ type: 'select_country', country: value })}
                    label={'Country'}
                    items={countries}
                    value={voiceState.country}
                />
                <BasicSelect
                    isDisabled={!voiceState.country.length}
                    onChange={(value: string) => voiceDispatch({ type: 'select_voice', voice: value })}
                    label={'Voice'}
                    items={voices}
                    value={voiceState.voice}
                />
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ margin: '15px 0px' }}>
                    <TextField
                        value={text}
                        onChange={handleTextChange}
                        fullWidth
                        label='Text'
                        required
                        placeholder='Enter text to be spoken'
                        multiline
                        minRows={3}
                        maxRows={20}
                        error={textError}
                        helperText={textError ? "Please enter some text" : ""}
                    />
                    <Box sx={{ position: 'relative', margin: '15px 0 0' }}>
                        <Button
                            disabled={pending}
                            fullWidth
                            sx={{ padding: '.75rem' }}
                            variant='contained'
                            type='submit'
                        >
                            Generate Audio
                        </Button>
                        {pending && (
                            <CircularProgress
                                size={28}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-14px',
                                    marginLeft: '-14px'
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <audio ref={el => { audioElement.current = el }} controls style={{ width: '100%' }}></audio>
            </Box>
            <SnackbarAlert open={alertState.open} alert={alertState.alert} onClose={handleClose} />
        </>
    );
}

const formatVoices = (voices: Record<string, any>): Record<string, any> => {
    return voices.map((v: Record<string, any>) => ({
        language: v.FriendlyName.match(/- ([a-zA-Z]+) \(/)[1],
        country: v.FriendlyName.match(/- .*\(([^)]+)\)/)[1],
        name: v.FriendlyName.match(/Microsoft (.+) Online/)[1],
        gender: v.Gender,
        shortName: v.ShortName
    })).reduce((acc: Record<string, any>, voice: Record<string, any>) => {
        acc[voice.language] = acc[voice.language] || {};
        acc[voice.language][voice.country] = acc[voice.language][voice.country] || [];
        acc[voice.language][voice.country].push({ name: voice.name, shortName: voice.shortName });

        return acc;
    }, {});
}

export default App;
