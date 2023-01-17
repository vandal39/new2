import { StyleSheet, Text, View, Alert , Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";
import axios from "axios";

const API_KEY = "5fce6b40d5831fc0d7bd5e10192c6c27";
const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [city, setCity] = useState<string|null>("");
  const [weatherdata, setWeatherdata] = useState<any>([]);

  const getPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("위치 정보를 허용해주세요...");
      return;
    } else {
      setPermission(true);
    }
  };

  const getLocation = async () => {
    const location = await getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    setLocation(location.coords);

    await reverseGeocodeAsync({ latitude, longitude }).then((response) => {
      setCity(response[0].region);
    });

    getWeatherData();
  }

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`);
      setWeatherdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    if (permission) {
      getLocation();
    }
  }, [permission]);

  const sr = new Date(weatherdata.sys.sunrise * 1000);
  const ss = new Date(weatherdata.sys.sunset * 1000);

  if (!permission) return null;
  else {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.city}>{city}, {weatherdata.name}</Text>
        </View>
        <Text style={styles.text}>날씨 : {weatherdata.weather[0].description}</Text>
        <Text style={styles.text}>기온 : {weatherdata.main.temp}</Text>
        <Text style={styles.text}>체감온도 : {weatherdata.main.feels_like}</Text>
        <Text style={styles.text}>습도 : {weatherdata.main.humidity}</Text>
        <Text style={styles.text}>기압 : {weatherdata.main.pressure}</Text>
        <Text style={styles.text}>풍속 : {weatherdata.wind.speed}</Text>
        <Text style={styles.text}>풍향 : {weatherdata.wind.deg}</Text>
        <Text style={styles.text}>일출 : {sr.toLocaleString()}</Text>
        <Text style={styles.text}>일몰 : {ss.toLocaleString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  city: {
    color: "white",
    fontSize: 30,
  },
  text:{
    color: "black",
    fontSize: 18,
  },
  box : {
    width: screenWidth - 30,
    height: 60,
    backgroundColor : "grey",
    borderRadius: 15,
    alignItems: "center",
  }
});