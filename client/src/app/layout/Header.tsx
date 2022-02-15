import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midLink = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}


export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector(state => state.basket); //  useStoreContext();
  const { user } = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static"  >
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

      }}>
        <Box display='flex' alignItems='center' margin='2px'>
          <Typography
            variant="h6"
            component={NavLink}
            to='/'
            exact
            sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch {...label} checked={darkMode} onChange={handleThemeChange} />
        </Box>

        {/* - */}


        <List sx={{ display: 'flex' }}>
          {midLink.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>


        {/* - */}

        <Box sx={{ display: 'flex' }}>
          <IconButton component={Link} to="/basket" size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: 'flex' }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  )
}