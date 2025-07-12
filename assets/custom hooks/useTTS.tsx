import { useState } from "react";
import { MsEdgeTTS, OUTPUT_FORMAT, PITCH, RATE } from "msedge-tts";
const DEFAULT_VOICE = 'en-US-AndrewNeural';
import xmlescape from 'xml-escape';

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
    const tts = new MsEdgeTTS();

    await tts.setMetadata(voice || DEFAULT_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    return await new Promise<string>(resolve => {
        const escapedText = xmlescape(text);
        const { audioStream: readable } = tts.toStream(escapedText, { pitch: settings.pitch + '%', rate: settings.rate + '%', volume: 100 });
        let data64 = Buffer.from([]);

        readable.on('data', data => {
            data64 = Buffer.concat([data64, data]);
        });

        readable.on('end', async () => {
            const blob = new Blob([data64], { type: 'audio/mpeg' });

            if (blob.size) {
                resolve(URL.createObjectURL(blob));
            }
        });
    });
};