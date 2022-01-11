import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
    //setDarkMode: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    //const darkMode = darkMode;
    return (
        <AppBar position="static" sx={{ mb: 4 }} >
            <Toolbar>
                <Typography variant="h6">
                    RE-STORE
                </Typography>
                <Switch {...label} checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}