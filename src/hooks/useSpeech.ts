import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeech(onSpeechInput?: (text: string) => void) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(1);
  const [speechRate, setSpeechRate] = useState(1.0);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSpeechSupported(true);
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsRecognitionSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && onSpeechInput) {
          onSpeechInput(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onSpeechInput]);

  const speak = useCallback((text: string) => {
    if (!isSpeechSupported || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner pronunciation
    const cleanText = text
      .replace(/[#*`_~\[\]]/g, ' ')
      .replace(/\(https?:\/\/[^\)]+\)/g, '')
      .replace(/\n+/g, '. ')
      .substring(0, 1000); // safe limit for web speech

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = speechRate;
    utterance.volume = voiceVolume;

    // Pick an articulate voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeechSupported, speechRate, voiceVolume]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        stopSpeaking();
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Could not start recognition:', err);
      }
    }
  }, [isListening, stopSpeaking]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Could not stop recognition:', err);
      }
    }
  }, [isListening]);

  return {
    isSpeaking,
    isListening,
    isSpeechSupported,
    isRecognitionSupported,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    speechRate,
    setSpeechRate,
    voiceVolume,
    setVoiceVolume,
  };
}
