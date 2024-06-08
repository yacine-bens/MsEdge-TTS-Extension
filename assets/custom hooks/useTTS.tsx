import { useState } from "react";
import { MsEdgeTTS, OUTPUT_FORMAT, PITCH, RATE } from "msedge-tts";
const DEFAULT_VOICE = 'en-US-AndrewNeural';
import xmlescape from 'xml-escape';

const rateOptions = {
    0: RATE.DEFAULT,
    20: RATE.X_SLOW,
    40: RATE.SLOW,
    60: RATE.MEDIUM,
    80: RATE.FAST,
    100: RATE.X_FAST,
};

const pitchOptions = {
    0: PITCH.DEFAULT,
    20: PITCH.X_LOW,
    40: PITCH.LOW,
    60: PITCH.MEDIUM,
    80: PITCH.HIGH,
    100: PITCH.X_HIGH,
};

export default function useTTS() {
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [audioLoading, setAudioLoading] = useState<boolean>(false);
    const [audioError, setAudioError] = useState<boolean | null>(null);

    const generateAudio = async (text: string, voice: string, settings: Record<string, any>) => {
        setAudioLoading(true);
        setAudioError(null);

        try {
            const url = await getAudioUrl(text, voice, settings);
            setAudioUrl(url);
        } catch (e) {
            setAudioError(true);
        } finally {
            setAudioLoading(false);
        }
    };

    return { audioUrl, audioLoading, audioError, generateAudio };
};

const getAudioUrl = async (text: string, voice: string, settings: Record<string, any>) => {
    console.log(rateOptions[settings.rate as keyof typeof rateOptions], pitchOptions[settings.pitch as keyof typeof pitchOptions]);
    const tts = new MsEdgeTTS();

    await tts.setMetadata(voice || DEFAULT_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    return await new Promise<string>(resolve => {
        const escapedText = xmlescape(text);
        const readable = tts.toStream(escapedText, { pitch: pitchOptions[settings.pitch as keyof typeof pitchOptions], rate: rateOptions[settings.rate as keyof typeof rateOptions], volume: 100 });
        let data64: any = '';

        readable.on('data', data => {
            data64 = Buffer.concat([Buffer.from(data64), Buffer.from(data)]);
        });

        readable.on('end', async () => {
            const blob = new Blob([data64], { type: 'audio/mpeg' });

            if (blob.size) {
                resolve(URL.createObjectURL(blob));
            }
        });
    });
};