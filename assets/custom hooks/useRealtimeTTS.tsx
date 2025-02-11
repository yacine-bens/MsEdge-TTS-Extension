import { useRef, useState } from 'react';
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import xmlescape from 'xml-escape';

export default function useRealtimeTTS() {
    const [isReading, setIsReading] = useState(false);
    const [currentChunk, setCurrentChunk] = useState(0);
    const ttsRef = useRef<MsEdgeTTS | null>(null);
    const audioQueueRef = useRef<string[]>([]);
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    const initTTS = async (voice: string) => {
        ttsRef.current = new MsEdgeTTS();
        await ttsRef.current.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    };

    const processTextChunk = async (text: string, settings: Record<string, any>) => {
        if (!ttsRef.current) return;
        // console.log(`Processing chunk: "${text}"`); // Log each chunk
    
        return new Promise<string>((resolve) => {
            const escapedText = xmlescape(text);
            const readable = ttsRef.current!.toStream(escapedText, {
                pitch: settings.pitch + '%',
                rate: settings.rate + '%',
                volume: 100
            });
    
            let data64: any = '';
            readable.on('data', data => {
                data64 = Buffer.concat([Buffer.from(data64), Buffer.from(data)]);
            });
            readable.on('end', () => {
                const blob = new Blob([data64], { type: 'audio/mpeg' });
                if (blob.size) {
                    const audioUrl = URL.createObjectURL(blob);
                    // console.log(`Generated audio URL: ${audioUrl}`);
                    resolve(audioUrl);
                } else {
                    console.warn(`Empty audio blob for chunk: "${text}"`);
                    resolve('');
                }
            });
        });
    };
    
    

    const startReading = async (text: string, voice: string, settings: Record<string, any>) => {
        if (!text) return;
        
        await initTTS(voice);
        setIsReading(true);
    
        // Split text into sentences or paragraphs
        const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
        console.log(`Chunks count: ${chunks.length}`);
        audioQueueRef.current = [];
    
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i].trim();
            if (chunk) {
                const audioUrl = await processTextChunk(chunk, settings);
                if (!audioUrl) {
                    console.error(`Error: No audio URL generated for chunk ${i + 1}`);
                    continue;
                }
                audioQueueRef.current.push(audioUrl);
                // console.log(`Added chunk ${i + 1} to queue`);
    
                if (i === 0) {
                    console.log(`Playing first chunk...`);
                    playAudio(audioUrl, 0);
                }
            }
        }
    
        console.log(`Final audio queue length: ${audioQueueRef.current.length}`);
    };

    
    const playAudio = (url: string, index: number) => {
        if (!url) {
            console.warn(`Skipping chunk ${index + 1}: URL is undefined`);
            return;
        }
    
        const audio = new Audio(url);
        currentAudioRef.current = audio;
        setCurrentChunk(index);
    
        audio.onended = () => {
            console.log(`Finished chunk ${index + 1}`);
    
            if (index + 1 < audioQueueRef.current.length) {
                console.log(`Playing chunk ${index + 2}/${audioQueueRef.current.length}`);
                playAudio(audioQueueRef.current[index + 1], index + 1);
            } else {
                console.log("Finished all chunks");
                setIsReading(false);
                setCurrentChunk(0);
            }
        };
    
        console.log(`Playing chunk ${index + 1}/${audioQueueRef.current.length}: ${url}`);
        audio.play().catch(err => console.error(`Error playing chunk ${index + 1}:`, err));
    };
    
    
    

    const pauseReading = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            setIsReading(false);
        }
    };

    const resumeReading = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.play();
            setIsReading(true);
        }
    };

    const stopReading = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            setIsReading(false);
            setCurrentChunk(0);
        }
    };

    return {
        isReading,
        currentChunk,
        startReading,
        pauseReading,
        resumeReading,
        stopReading
    };
}
