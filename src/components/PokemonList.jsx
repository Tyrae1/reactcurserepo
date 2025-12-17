import {List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Alert, CircularProgress, Stack} from '@mui/material';
import {useGetPokemonListQuery, pokemonApi } from "../services/pokemonApi.js";
import {useDispatch} from "react-redux";

function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

function getSpriteById(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default function PokemonList({limit, offset, onSelect}) {
    const dispatch = useDispatch();
    const {data, isLoading, isError, error} = useGetPokemonListQuery({limit, offset});
    if (isLoading) {
        return (
            <Stack direction="row" alignItems="center" spacing={1}>
              <CircularProgress size={20} />
              <div>Loading...</div>
            </Stack>
        );
    }
    if (isError) {
        return (
            <Alert severity="error">
                Failed to load list{error?.status ? ` (status: ${error.status})` : ""},
            </Alert>
        );
    }
    const results = data?.results ?? [];
    if (results.length === 0) {
        return <Alert severity="info">No pokemon found.</Alert>
    }

    return (
        <List dense>
            {results.map((p) => {
                const id = getIdFromUrl(p.url);
                const sprite = getSpriteById(id);
                return (
                    <ListItemButton
                    key={p.name}
                    onClick={() => onSelect?.(p.name)}
                    onMouseEnter={() => {
                    dispatch(
                        pokemonApi.util.prefetch("getPokemonByName", p.name, {force: false})
                    );
                    }}
                    >
                        <ListItemAvatar>
                            <Avatar src={sprite} alt={p.name} imgProps={{loading: "lazy"}} />
                        </ListItemAvatar>
                        <ListItemText primary={p.name} secondary={`#${id}`}/>
                    </ListItemButton>
                );
            })}
        </List>
    );
}