import * as React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function LocationScreen() {
  const [pin, setPin] = React.useState({
    latitude: 23.759041,
    longitude: 90.371197,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [region, setRegion] = React.useState({
    latitude: 23.759041,
    longitude: 90.371197
  });
  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance'
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          });
        }}
        query={{
          key: 'AIzaSyD-gMW1YiQ8K-Aemqb0hyGT3R-dmIGEiac',
          language: 'en',
          components: 'country:bd',
          typs: 'establishment',
          radius: 30000,
          location: `${region.latitude},${region.longitude}`
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1
          },
          listView: { backgroundColor: 'white' }
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.759041,
          longitude: 90.371197,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log('Drag start', e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
        >
          <Callout>
            <Text>{region.latitude}</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
