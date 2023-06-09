import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  Audio, InterruptionModeAndroid, InterruptionModeIOS
} from 'expo-av';

const API_KEY = '';

const HomePage = () => {
  const [voices, setVoices] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState(null);
  const [soundObject, setSoundObject] = useState(null);

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
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });


    setSoundObject(new Audio.Sound());
    // Get voices
    // ... fetch logic
    fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'Xi-Api-Key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setVoices(data.voices);
      });

    // Get Models
    fetch('https://api.elevenlabs.io/v1/models', {
      headers: {
        'Xi-Api-Key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        setModels(data);
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
      <TextInput onChangeText={handleTextChange} value={text} style={styles.inputStyles} multiline={true} />
      <Button onPress={synthesizeSpeech} title="Synthesize Speech" color="#007BFF" />
      {audioURL && <Audio.Sound source={{ uri: audioURL }} />}
    </ScrollView>
  );
}

export default HomePage;
