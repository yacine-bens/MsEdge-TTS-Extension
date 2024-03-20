import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import BasicSelect from '@/assets/components/BasicSelect';
import { Box, CircularProgress, Button, TextField, Typography, Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import VoiceAppBar from '@/assets/components/VoiceAppBar';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

function App() {
    const DEFAULT_VOICE = 'en-US-AndrewNeural';

    const tts = new MsEdgeTTS();

    const [data, setData] = useState({} as { [key: string]: { [key: string]: any[] } });
    const [loadingData, setLoadingData] = useState(true);

    const [currentVoice, setCurrentVoice] = useState('');

    const [languages, setLanguages] = useState([] as string[]);
    const [countries, setCountries] = useState([] as string[]);
    const [voices, setVoices] = useState([] as any[]);

    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [voice, setVoice] = useState('');

    const [text, setText] = useState('');
    const [textError, setTextError] = useState(false);
    const [pending, setPending] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarAlert, setSnackbarAlert] = useState({ severity: 'success', msg: `Voice is set to ${currentVoice}` } as any);

    const audioElement = useRef<HTMLAudioElement | null>(null);

    const speakText = async (txt: string) => {
        setPending(true);

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
            setPending(false);
        });
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
        setTextError(!e.target.validity.valid);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(e.target as HTMLFormElement).checkValidity() || !text.trim().length) {
            setTextError(true);
            return;
        }

        speakText(text)
            .catch(e => {
                console.log(e);
                setPending(false);
                showError();
            });
    }

    const showError = () => {
        setSnackbarAlert({ severity: 'error', msg: 'Error, please try again' });
        setSnackbarOpen(true);
    };

    useEffect(() => {
        chrome.storage.session.onChanged.addListener((changes) => {
            for (let change in changes) {
                if (change === 'text' && changes[change].newValue) {
                    setText(changes[change].newValue);
                    speakText(changes[change].newValue)
                        .catch(e => {
                            console.log(e);
                            setPending(false);
                            showError();
                        })
                }
            }
        });

        (async () => {
            const { voice: storageVoice } = await chrome.storage.local.get('voice');
            setCurrentVoice(storageVoice || DEFAULT_VOICE);

            console.log('storageVoice:', storageVoice);

            const { text: storageText } = await chrome.storage.session.get('text');

            if (storageText) {
                setText(storageText);
                speakText(storageText)
                    .catch(e => {
                        console.log(e);
                        setPending(false);
                        showError();
                    });
            }
        })();

        tts.getVoices()
            .then(voices => { setData(formatVoices(voices)); setLoadingData(false); })
            .catch(e => {
                console.log(e);
                setLoadingData(false);
                showError();
            });
    }, []);

    useEffect(() => {
        if (!data) return;
        setLanguages(Object.keys(data));
    }, [data]);

    useEffect(() => {
        if (!language || !data[language]) return;
        setCountries(Object.keys(data[language]));
        // chrome.storage.local.set({ voice: { language, country: '', voiceShortName: '' } });
        setCountry('');
        setVoice('');
    }, [language]);

    useEffect(() => {
        if (!country || !data[language] || !data[language][country]) return;
        setVoices(data[language][country]);
        // chrome.storage.local.set({ voice: { language, country, voiceShortName: '' } });
        setVoice('');
    }, [country]);

    useEffect(() => {
        if (!voice) return;
        chrome.storage.local.set({ voice });
        setCurrentVoice(voice);
        setSnackbarAlert({ severity: 'success', msg: `Voice is set to ${voice}` });
        setSnackbarOpen(true);
    }, [voice]);

    useEffect(() => {
        if (text.length) setTextError(false);
    }, [text]);

    return (
        <>
            <VoiceAppBar voice={currentVoice} />
            {/* <Box sx={{ boxShadow: 4, padding: 1, borderRadius: '10px' }}> */}
            <Box>
                <BasicSelect
                    onChange={(value: string) => setLanguage(value)}
                    label={'Language'}
                    items={loadingData ? [<CircularProgress sx={{ margin: '0 40%' }} color='inherit' size={28} />] : languages}
                    value={language}
                />
                <BasicSelect
                    isDisabled={!language.length}
                    onChange={(value: string) => setCountry(value)}
                    label={'Country'}
                    items={countries}
                    value={country}
                />
                <BasicSelect
                    isDisabled={!country.length}
                    onChange={(value: string) => setVoice(value)}
                    label={'Voice'}
                    items={voices}
                    value={voice}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbarAlert.severity}
                    variant='filled'
                    sx={{ width: '100%' }}
                    onClose={handleClose}
                >
                    {snackbarAlert.msg}
                </Alert>
            </Snackbar>
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
