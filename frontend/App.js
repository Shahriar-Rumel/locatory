import { useState } from 'react';
import { useFonts } from 'expo-font';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import Locatory from './app/Locatory';
import logger from './app/utility/logger';

logger.start();

export default function App() {
  const [user, setUser] = useState(false);

  const [fontsLoaded] = useFonts({
    'SFPD-bold': require('./app/assets/fonts/SFPD-Bold.otf'),
    'SFPD-semiBold': require('./app/assets/fonts/SFPD-Semibold.otf'),
    'SFPD-medium': require('./app/assets/fonts/SFPD-Medium.otf'),
    'SFPD-regular': require('./app/assets/fonts/SFPD-Regular.otf')
  });
  if (!fontsLoaded) {
    return null;
  }

  logger.log(new Error('Font Loaded'));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Locatory />
      </PersistGate>
    </Provider>
  );
}
