import {SplashScreen, Stack} from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';


SplashScreen.preventAutoHideAsync();

const Layout =() =>{
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMmedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  })


  const onLayoutROOTView = useCallback(async ()=> {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if(!fontsLoaded) return null;

  return <Stack onLayout={onLayoutROOTView}/>

}

export default Layout;