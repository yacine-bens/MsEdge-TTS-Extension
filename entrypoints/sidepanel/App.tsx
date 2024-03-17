import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import BasicSelect from '@/assets/components/BasicSelect';
import { Box, CircularProgress, Button, TextField } from '@mui/material';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

console.log('out of app');

function App() {
    // console.log('inside app');


    const DEFAULT_VOICE = 'en-US-AndrewNeural';

    const tts = new MsEdgeTTS();

    const [data, setData] = useState({} as { [key: string]: { [key: string]: any[] } });
    const [loading, setLoading] = useState(true);

    const [languages, setLanguages] = useState([] as string[]);
    const [countries, setCountries] = useState([] as string[]);
    const [voices, setVoices] = useState([] as any[]);

    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [voice, setVoice] = useState('');

    const [text, setText] = useState('');
    const [pending, setPending] = useState(false);

    const audioElement = useRef<HTMLAudioElement | null>(null);

    const speakText = async (txt: string) => {
        setPending(true);

        // console.log('h0');
        // await tts.setMetadata(voice, OUTPUT_FORMAT.WEBM_24KHZ_16BIT_MONO_OPUS);
        const { voice } = await chrome.storage.local.get('voice');
        console.log('voice:', voice);
        await tts.setMetadata(voice || DEFAULT_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
        // console.log('h1');
        const readable = tts.toStream(txt);
        // console.log('h2');
        let data64: any = '';

        readable.on('data', data => {
            // console.log('h3');
            data64 = Buffer.concat([Buffer.from(data64), Buffer.from(data)]);
            // console.log('h4');
        });

        readable.on('end', async () => {
            // console.log('h5');
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

    useEffect(() => {
        chrome.storage.session.onChanged.addListener((changes) => {
            console.log('changes');
            for (let change in changes) {
                if (change === 'text' && changes[change].newValue) {
                    console.log('text change:', changes[change].newValue);
                    setText(changes[change].newValue);
                    speakText(changes[change].newValue);
                }
            }
        });

        // get text and voice from storage
        (async () => {
            // const { voice: storageVoice } = await chrome.storage.local.get('voice');
            // setVoice(storageVoice || DEFAULT_VOICE);
            const { text: storageText } = await chrome.storage.session.get('text');

            const { language, country, voice } = await chrome.storage.local.get(['language', 'country', 'voice']);
            console.log(language, country, voice);

            if (storageText) {
                setText(storageText);
                try {
                    await speakText(storageText);
                }
                catch (e) { console.log(e); }
            }
        })();


        tts.getVoices()
            .then(voices => { setData(formatVoices(voices)); setLoading(false); })
            .catch(e => console.log(e));
    }, []);

    useEffect(() => {
        if (!data) return;
        setLanguages(() => {
            // (async () => {
            //     console.log('1.1');
            //     const { language } = await chrome.storage.local.get('language');
            //     setLanguage(language || '');
            //     console.log('1.2');
            //     // setCountry(country || '');
            //     // setVoice(voice || '');
            // })();
            return Object.keys(data);
        });
    }, [data]);

    useEffect(() => {
        if (!languages || !languages.length) return;
        (async () => {
            const { language: storageLanguage } = await chrome.storage.local.get('language');
            setLanguage(storageLanguage || '');
        })();
    }, [languages]);

    useEffect(() => {
        if (!language || !data[language]) return;
        setCountries(() => {
            (async () => {
                console.log('2.1');
                const { language: storageLanguage } = await chrome.storage.local.get('language');
                if (language !== storageLanguage) {
                    console.log('2.2');
                    setCountry('');
                    setVoice('');
                    // if (language) chrome.storage.local.set({ language });
                    chrome.storage.local.set({ language });
                    chrome.storage.local.remove(['country', 'voice']);
                }
                else {
                    console.log('2.3');
                    const { country } = await chrome.storage.local.get('country');
                    setCountry(country || '');
                }
            })();
            return Object.keys(data[language]);
        });
    }, [language]);

    useEffect(() => {
        if (!countries || !countries.length) return;
        (async () => {
            const { country } = await chrome.storage.local.get('country');
            setCountry(country || '');
        })();
    }, [countries]);

    useEffect(() => {
        if (!country || !data[language] || !data[language][country]) return;
        setVoices(() => {
            (async () => {
                console.log('3.1');
                const { country: storageCountry } = await chrome.storage.local.get('country');
                if (country !== storageCountry) {
                    console.log('3.2');
                    setVoice('');
                    // if (country) chrome.storage.local.set({ country });
                    chrome.storage.local.set({ country });
                    console.log('removing voice');
                    chrome.storage.local.remove('voice');
                }
                else {
                    console.log('3.3');
                    const { voice: storageVoice } = await chrome.storage.local.get('voice');
                    console.log('voiceee', storageVoice);
                    
                    setVoice(storageVoice || '');
                }
            })();
            return data[language][country];
        });
    }, [country]);

    useEffect(() => {
        console.log('voices:', voices);
        if (!voices || !voices.length) return;
        (async () => {
            const { voice: storageVoice } = await chrome.storage.local.get('voice');
            console.log('voices 1:', storageVoice);
            console.log('voices 2:', voice);
            
            setVoice(storageVoice || '');
        })();
    }, [voices]);

    useEffect(() => {
        // console.log('4');
        console.log('voice:', voice);
        console.log('country:', country);
        if (!voice) return;
        (async () => {
            const { voice: storageVoice } = await chrome.storage.local.get('voice');
            if (voice !== storageVoice) {
                chrome.storage.local.set({ voice });
            }
        })();
    }, [voice]);

    return (
        <>
            {/* <Box sx={{ boxShadow: 4, padding: 1, borderRadius: '10px' }}> */}
            <Box>
                {/* <BasicSelect onChange={(value: string) => setLanguage(value)} label={'Language'} items={loading ? [<CircularProgress sx={{ margin: '0 40%' }} color='inherit' size={28} />] : Object.keys(data)} value={language} />
                <BasicSelect isDisabled={!language.length} onChange={(value: string) => setCountry(value)} label={'Country'} items={language && data[language] && Object.keys(data[language])} value={country} />
                <BasicSelect isDisabled={!country.length} onChange={(value: string) => setVoice(value)} label={'Voice'} items={country && data[language] && data[language][country] || []} value={voice} /> */}
                <BasicSelect onChange={(value: string) => setLanguage(value)} label={'Language'} items={loading ? [<CircularProgress sx={{ margin: '0 40%' }} color='inherit' size={28} />] : languages} value={language} />
                <BasicSelect isDisabled={!language.length} onChange={(value: string) => setCountry(value)} label={'Country'} items={language && languages && countries} value={country} />
                <BasicSelect isDisabled={!country.length} onChange={(value: string) => setVoice(value)} label={'Voice'} items={country && languages && voices} value={voice} />
                <Box sx={{ margin: '15px 0px' }}>
                    <TextField value={text} onChange={e => setText(e.target.value)} fullWidth label={'Text'} required placeholder='Enter text to be spoken' multiline minRows={3} maxRows={20} />
                    <Box sx={{ position: 'relative', margin: '15px 0 0' }}>
                        <Button
                            disabled={pending}
                            onClick={() => { console.log('click!'); speakText(text); }}
                            fullWidth
                            sx={{ padding: '.75rem' }}
                            variant='contained'
                        >
                            Generate Audio
                            {/* {pending ? <CircularProgress color='inherit' size={28} /> : "Generate Audio"} */}
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
