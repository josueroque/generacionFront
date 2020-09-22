import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {store,persistor} from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'core-js';
import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#0d47a1',
        },
    },
});
ReactDOM.render(  
     <PersistGate loading={null} persistor={persistor}> 
        <Provider store={store}>
        <MuiThemeProvider theme={theme}>
           <App />
        </MuiThemeProvider>   
        </Provider> 
        
    </PersistGate>    
    ,document.getElementById('root')
    );

