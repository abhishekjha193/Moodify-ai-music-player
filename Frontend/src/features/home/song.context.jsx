import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateSong = (newSong) => {
        if (!newSong || !newSong.url) {
            console.warn("Invalid song data");
            return;
        }
        setSong(newSong);
    };

    return (
        <SongContext.Provider
            value={{
                song,
                updateSong,
                loading,
                setLoading,
                error,
                setError
            }}
        >
            {children}
        </SongContext.Provider>
    );
};