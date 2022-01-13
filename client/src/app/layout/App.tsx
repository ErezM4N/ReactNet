import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';


// const productsList = [
//   { id: 1, name: 'product1', price: 100.00 },
//   { id: 2, name: 'product2', price: 200.00 },
// ]


function App() {

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
    //console.log(darkMode);
    setDarkMode(!darkMode);
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Container>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/catalog' component={Catalog}/>
          <Route path='/catalog/:id' component={ProductDetails}/>
          <Route path='/about' component={AboutPage}/>
          <Route path='/contact' component={ContactPage}/>
          {/* <Catalog /> */}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
/*  */