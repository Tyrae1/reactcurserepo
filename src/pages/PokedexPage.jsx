import {useState} from "react";
import {Container, Stack, Typography, Button} from "@mui/material";
import PokemonList from "../components/PokemonList";

export default function PokedexPage() {
    const LIMIT = 20;
    const [offset, setOffset] = useState(0);
    const handlePrev = () => setOffset((v) => Math.max(0, V - LIMIT));
    const handleNext = () => setOffset((v) => V + LIMIT);
    return (
        <Container sx={{py: 4}}>
            <Stack spacing={2}>
                <Typography variant="h4">Mini Pokedex</Typography>

                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handlePrev} disabled={offset === 0}>
                        Prev
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                        Next
                    </Button>
                </Stack>
                <PokemonList limit={LIMIT} offset={offset} />
            </Stack>
        </Container>
    );
}