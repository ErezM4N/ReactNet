import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from 'react';


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

        <Catalog />
      </Container>


    </ThemeProvider>


  );
}

export default App;
/*  */