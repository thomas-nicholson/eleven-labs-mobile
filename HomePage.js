import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  Audio, InterruptionModeAndroid, InterruptionModeIOS
} from 'expo-av';
import Slider from '@react-native-community/slider';

const API_KEY = '';

const HomePage = () => {
  const [voices, setVoices] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState(null);
  const [soundObject, setSoundObject] = useState(null);
  const [stability, setStability] = useState(75);
  const [similarity, setSimilarity] = useState(75);

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
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Xi-Api-Key': API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: selectedModel.model_id,
          voice_settings: {
            stability,
            similarity_boost: similarity
            }
        }),
      });

      if (response.ok) {
        setAudioURL(response.status);
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
        setSelectedVoice(data.voices[0].voice_id);
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
          <Picker.Item key={voice.voice_id} label={voice.name} value={voice.voice_id} />
        ))}
      </Picker>
      <Picker selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) => setSelectedModel(itemValue)}>
        {models.map(model => (
          <Picker.Item key={model.model_id} label={model.name} value={model.model_id} />
        ))}
      </Picker>
      <TextInput onChangeText={handleTextChange} value={text} style={styles.inputStyles} multiline={true} />
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <Text>Stability: {stability}%</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#0000FF"
          maximumTrackTintColor="#000000"
          onValueChange={(stability) => setStability(Math.trunc(stability))}
          value={stability}
        />
      </View>
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        <Text>Clarity + Similarity Enhancement: {similarity}%</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#0000FF"
          maximumTrackTintColor="#000000"
          onValueChange={(similarity) => setSimilarity(Math.trunc(similarity))}
          value={similarity}
        />
      </View>
      <Button onPress={synthesizeSpeech} title="Synthesize Speech" color="#007BFF" />
    </ScrollView>
  );
}

export default HomePage;
