import { useReducer, useEffect } from "react";
import { MsEdgeTTS } from "msedge-tts";

type State = {
    data: Record<string, any>;
    loading: boolean;
    error: any;
    languages: string[];
    countries: string[];
    voices: Record<string, any>[];
};

type Action =
    | { type: "SET_LANGUAGES"; payload: Record<string, any> }
    | { type: "SET_COUNTRIES"; payload: Record<string, any> }
    | { type: "SET_VOICES"; payload: Record<string, any> }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_ERROR"; payload: any };

const initialState: State = {
    data: {},
    loading: false,
    error: null,
    languages: [],
    countries: [],
    voices: [],
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_LANGUAGES":
            return { ...state, data: action.payload, languages: Object.keys(action.payload).sort() };
        case "SET_COUNTRIES":
            if (!state.data[action.payload.language]) return state;
            return { ...state, countries: Object.keys(state.data[action.payload.language]).sort() };
        case "SET_VOICES":
            if (!state.data[action.payload.language] || !state.data[action.payload.language][action.payload.country]) return state;
            return { ...state, voices: state.data[action.payload.language][action.payload.country] };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default function useFetch(dependency: Record<string, any>) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const tts = new MsEdgeTTS();

            dispatch({ type: "SET_LOADING", payload: true });

            try {
                const voices = await tts.getVoices();
                const formattedVoices = formatVoices(voices);

                dispatch({ type: "SET_LANGUAGES", payload: formattedVoices });
            } catch (err) {
                dispatch({ type: "SET_ERROR", payload: err });
            } finally {
                dispatch({ type: "SET_LOADING", payload: false });
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dependency.language) {
            if (dependency.country) {
                dispatch({ type: "SET_VOICES", payload: dependency });
            }
            else {
                dispatch({ type: "SET_COUNTRIES", payload: dependency });
            }
        }
    }, [dependency]);

    return [state.loading, state.error, state.languages, state.countries, state.voices];
}

const formatVoices = (voices: Record<string, any>): Record<string, any> => {
    return voices.map((v: Record<string, any>) => ({
        language: v.FriendlyName.match(/- ([a-zA-Z]+) \(/)[1],
        country: v.FriendlyName.match(/- .*\(([^)]+)\)/)[1],
        name: v.FriendlyName.match(/Microsoft (.+) Online/)[1],
        gender: v.Gender,
        shortName: v.ShortName,
    })).reduce((acc: Record<string, any>, voice: Record<string, any>) => {
        acc[voice.language] = acc[voice.language] || {};
        acc[voice.language][voice.country] = acc[voice.language][voice.country] || [];
        acc[voice.language][voice.country].push({ name: voice.name, shortName: voice.shortName });

        return acc;
    }, {});
};