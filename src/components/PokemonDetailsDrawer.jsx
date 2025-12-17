import {
    Drawer,
    Box,
    Stack,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Chip,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {skipToken} from "@reduxjs/toolkit/query";
import {useGetPokemonByNameQuery, useGetPokemonSpeciesQuery} from "../services/pokemonApi.js";

export default function PokemonDetailsDrawer({open, onClose, nameOrId}) {
    const queryArg = nameOrId ? nameOrId : skipToken;
    const {data, isLoading, isError, error} = useGetPokemonByNameQuery(queryArg);
    const {data: species} = useGetPokemonSpeciesQuery(queryArg);

    const description = species?.flavor_text_entries
        ?.find((e)=> e.language.name === "en")
        ?.flavor_text.replace(/\f/g, " ");

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{width: 360, p:2}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Details</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Divider sx={{my:2}} />

                {!nameOrId && <Alert severity="info">Pick a pokemon</Alert>}

                {isLoading && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CircularProgress size={20} />
                        <div>Loading details...</div>
                    </Stack>
                )}

                {isError && (
                    <Alert severity="error">
                        Failed to load details{error?.status ? `(status: ${error.status})` : ""}.
                    </Alert>
                )}

                {data && (
                    <Stack spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <img
                                src={data.sprites?.front_default || ""}
                                alt={data.name}
                                width={96}
                                height={96}
                                />
                            <Box>
                                <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                                    {data.name}
                                </Typography>
                                <Typography variant="body2">ID: {data.id}</Typography>
                            </Box>
                        </Stack>
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Types
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" spacing={1}>
                                {data.types?.map((t) => (
                                    <Chip key={t.type.name} label={t.type.name} />
                                ))}
                            </Stack>
                        </Box>

                        {description && (
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Description
                                </Typography>
                                <Typography variant="body2">
                                    {description}
                                </Typography>
                            </Box>
                        )}

                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Stats
                            </Typography>
                            <Stack spacing={1}>
                                {data.stats?.map((s) => (
                                    <Stack
                                    key={s.stat.name}
                                    direction="row"
                                    justifyContent="space-between"
                                    >
                                        <Typography variant="body2">{s.stat.name}</Typography>
                                        <Typography variant="body2">{s.base_stat}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                )}
            </Box>
        </Drawer>
    );
}