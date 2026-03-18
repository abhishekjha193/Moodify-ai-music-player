import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong = () => {
    const context = useContext(SongContext);

    if (!context) {
        throw new Error("useSong must be used within SongContextProvider");
    }

    const { loading, setLoading, song, updateSong } = context;

    const handleGetSong = async ({ mood }) => {
        try {
            setLoading(true);

            const data = await getSong({ mood });

            if (!data || !data.song) {
                throw new Error("Invalid response");
            }

            updateSong(data.song);

        } catch (err) {
            console.error("Error fetching song:", err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, song, handleGetSong };
};