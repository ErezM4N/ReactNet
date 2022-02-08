import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from '../../features/about/AboutPage';
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import BasketPage from '../../features/basket/BasketPage';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from '../../features/catalog/ProductDetails';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import { useAppDispatch } from '../store/configureStore';
import Header from "./Header";
import Loadingcomponent from './LoadingComponent';
import PrivateRoute from "./PrivateRoute";


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {

    initApp().then(() => setLoading(false));

  }, [initApp]);

  if (loading) return <Loadingcomponent message='Initializing app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position='bottom-right' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route path='/basket' component={BasketPage} />
            <PrivateRoute path='/checkout' component={CheckoutPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
