import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Audio } from 'expo-av';

const API_KEY = '8a8ca1298db8e97112bda505bd0dd32e'; // Your API key


const HomePage = ({ navigation }) => {
  const [voices, setVoices] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState(null);
  const [soundObject, setSoundObject] = useState(null);

  const [history, setHistory] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleTextChange = (value) => {
    setText(value);
  }

  const styles = StyleSheet.create({
    appStyles: {
      padding: 20,
      // fontFamily: 'Arial',
      backgroundColor: '#f5f5f5'
    },
    titleStyles: {
      color: '#333',
      marginBottom: 10
    },
    inputStyles: {
      width: '100%',
      height: 100,
      padding: 10
    },
    buttonStyles: {
      padding: 10,
      color: 'white',
      backgroundColor: '#007BFF',
      borderRadius: 5,
      marginTop: 10
    },
    audioPlayerStyles: {
      marginTop: 20
    },
    historyItemStyles: {
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
  });

  const synthesizeSpeech = async () => {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice.voice_id}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Xi-Api-Key': API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: selectedModel.model_id,
        }),
      });

      if (response.ok) {
        const audioURL = response.url;
        await soundObject.unloadAsync();
        await soundObject.loadAsync({ uri: audioURL }); 
        await soundObject.playAsync();
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle errors
    }
  }

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });
    

    setSoundObject(new Audio.Sound());
    // Get voices
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'Xi-Api-Key': '8a8ca1298db8e97112bda505bd0dd32e'
      }
    })
      .then(res => res.json())
      .then(data => {
        setVoices(data.voices);
      });

    // Get Models
    fetch('https://api.elevenlabs.io/v1/models', {
      headers: {
        'Xi-Api-Key': '8a8ca1298db8e97112bda505bd0dd32e'
      }
    })
      .then(res => res.json())
      .then(data => {
        setModels(data);
      });

    // Get history
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/history', {
      headers: {
        'Xi-Api-Key': '8a8ca1298db8e97112bda505bd0dd32e'
      }
    })
      .then(res => res.json())
      .then(data => {
        setHistory(data.history);
      });

    // Get subscription info
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: {
        'Xi-Api-Key': '8a8ca1298db8e97112bda505bd0dd32e'
      }
    })
      .then(res => res.json())
      .then(data => {
        setSubscription(data);
      });

    // Get user info
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/user', {
      headers: {
        'Xi-Api-Key': '8a8ca1298db8e97112bda505bd0dd32e'
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  // ...synthesize speech logic

  return (
    <ScrollView style={styles.appStyles}>
      <Picker selectedValue={selectedVoice} onValueChange={(itemValue, itemIndex) => setSelectedVoice(itemValue)}>
        {voices.map(voice => (
          <Picker.Item key={voice.voice_id} label={voice.name} value={voice} />
        ))}
      </Picker>
      <Picker selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) => setSelectedModel(itemValue)}>
        {models.map(model => (
          <Picker.Item key={model.model_id} label={model.name} value={model} />
        ))}
      </Picker>
      
      <TextInput onChangeText={handleTextChange} value={text} style={styles.inputStyles} multiline={true}/>
      
      <Button onPress={synthesizeSpeech} title="Synthesize Speech" color="#007BFF" />

      {audioURL && <Audio.Sound source={{ uri: audioURL }} />}
      
      <Button onPress={() => navigation.navigate('History', { history })} title="View History" />

      
      <Text style={styles.titleStyles}>Subscription</Text>
      {subscription && (
        <View style={styles.historyItemStyles}>
          <Text>Tier: {subscription.tier}</Text>
          <Text>Character Limit: {subscription.character_limit}</Text>
          <Text>Voice Limit: {subscription.voice_limit}</Text>
        </View>
      )}
      
      {userInfo && (
        <View style={styles.historyItemStyles}>
          <Text style={styles.titleStyles}>User</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Is New User: {userInfo.is_new_user}</Text>
        </View>
      )}
      </ScrollView>
    );
  }
  
  export default HomePage;
  