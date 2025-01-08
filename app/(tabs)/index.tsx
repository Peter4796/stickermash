import { Text, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image'
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

interface StateProps{
  selectedImage: string|undefined
}
const PlaceholderImage = require('@/assets/images/background-image.png')
export default function Index() {
  const [state, setState] = useState<StateProps>({
    selectedImage: ''
  })
  const {selectedImage}=state
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      setState({
        ...state,
        selectedImage: result.assets[0].uri
      })
    }
    else {
      alert('You did not select any image.')
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme={'primary'} onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
