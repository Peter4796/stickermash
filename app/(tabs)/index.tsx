import { Text, View, StyleSheet } from 'react-native';
import { type ImageSource } from 'expo-image'
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface StateProps {
  selectedImage: string | undefined
  showAppOptions: boolean
  isModalVisible: boolean
}
const PlaceholderImage = require('@/assets/images/background-image.png')
export default function Index() {
  const [state, setState] = useState<StateProps>({
    selectedImage: '',
    showAppOptions: false,
    isModalVisible: false,
  })
  const { selectedImage, showAppOptions, isModalVisible} = state
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1
    })
    if (!result.canceled) {
      setState({
        ...state,
        selectedImage: result.assets[0].uri,
        showAppOptions: true
      })
    }
    else {
      alert('You did not select any image.')
    }
  }
  const onReset = () => {

  },
    onAddSticker = () => {
      setState({
        ...state,
        isModalVisible: true
      })

    },
    onSaveImageAsync = () => {

    }
  const onModalClose = () => {
    setState({
      ...state,
      isModalVisible: false
    })
  }
  return (
    <GestureHandlerRootView>
   <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {
        showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton onPress={onReset} label='reset' icon='refresh' />
              <CircleButton onPress={onAddSticker} />
              <IconButton onPress={onSaveImageAsync} label='Save' icon='save-alt' />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme={'primary'} onPress={pickImageAsync} />
            <Button label="Use this photo" />
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onCloseModal={onModalClose} onSelect={setPickedEmoji} />
      </EmojiPicker>
    </View>
    </GestureHandlerRootView>
 
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
  optionsContainer: {
    position: 'absolute',
    bottom: 70
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
