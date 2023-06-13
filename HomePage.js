import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import {
  Audio, InterruptionModeAndroid, InterruptionModeIOS
} from 'expo-av';
import Slider from '@react-native-community/slider';
import { Alert } from 'react-native';

const API_KEY = '95630de49b16b24e78cf989a4a69542b';

const Container = styled.ScrollView`
  padding: 20px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledInput = styled.TextInput`
  height: 100px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #000;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;


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
      Alert.alert("Error", "Unable to synthesize speech at the moment. Please try again later.");
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
      <Container>
        <Title>Select Voice:</Title>
        <Picker selectedValue={selectedVoice} onValueChange={(itemValue, itemIndex) => setSelectedVoice(itemValue)}>
          {voices.map(voice => (
            <Picker.Item key={voice.voice_id} label={voice.name} value={voice.voice_id} />
          ))}
        </Picker>
  
        <Title>Select Model:</Title>
        <Picker selectedValue={selectedModel} onValueChange={(itemValue, itemIndex) => setSelectedModel(itemValue)}>
          {models.map(model => (
            <Picker.Item key={model.model_id} label={model.name} value={model.model_id} />
          ))}
        </Picker>
  
        <Title>Enter Text:</Title>
        <StyledInput onChangeText={handleTextChange} value={text} multiline={true} />
  
        <Title>Stability: {stability}%</Title>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000000"
          onValueChange={(stability) => setStability(Math.trunc(stability))}
          value={stability}
        />
  
        <Title>Clarity + Similarity Enhancement: {similarity}%</Title>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#000000"
          onValueChange={(similarity) => setSimilarity(Math.trunc(similarity))}
          value={similarity}
        />
        <ButtonContainer onPress={synthesizeSpeech}>
        <ButtonText>Synthesize Speech</ButtonText>
      </ButtonContainer>
    </Container>
  );
}

export default HomePage;
