import { ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState([]);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const endGame = () => setGameIsOver(true);

  const startNewGameHandler = () => {
    setUserNumber(null);
    setGameIsOver(false);
    setGuessRounds([]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {userNumber == null && !gameIsOver ? (
            <StartGameScreen setUserNumber={setUserNumber} />
          ) : userNumber != null && !gameIsOver ? (
            <GameScreen
              userNumber={userNumber}
              endGame={endGame}
              guessRounds={guessRounds}
              setGuessRounds={setGuessRounds}
            />
          ) : (
            <GameOverScreen
              userNumber={userNumber}
              onStartNewGame={startNewGameHandler}
              guessRounds={guessRounds}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
