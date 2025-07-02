'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './interview.css';

function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Text-to-speech not supported.");
  }
}


export default function InterviewPage() {
  const videoRef = useRef(null);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'general';

  const [aiQuestion, setAiQuestion] = useState('Loading your first question...');
  const [cameraOn, setCameraOn] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFollowUp, setAiFollowUp] = useState('');

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraOn(true);
        }
      } catch (err) {
        console.error('Camera/Mic error:', err);
      }
    }

    async function fetchAIQuestion() {
      try {
        const res = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Give me one short, concise mock interview question (1-2 lines only) for a ${type} interview.`,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error('Server error:', text);
          throw new Error('Server returned error status');
        }

        const data = await res.json();
        console.log('✅ AI response:', data);

        const question = data.response || 'Could not load question. Try again.';
        setAiQuestion(question);

        // ✅ Speak the question aloud
        speakText(question);

      } catch (error) {
        console.error('❌ Gemini fetch error:', error);
        setAiQuestion('Failed to load question. Try again later.');
      }
    }


    enableCamera();
    fetchAIQuestion();
  }, [type]);

  const handleMicInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setUserAnswer(prev => prev + ' ' + speechToText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      alert('Speech recognition error: ' + event.error);
    };
  };

  const handleSendAnswer = async () => {
    if (!userAnswer.trim()) return;

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are MocqAI, an AI interviewer. Here's a user's short answer to the interview question: "${aiQuestion}". Give a concise follow-up question or actionable feedback under 3 lines.

User Answer: ${userAnswer}`,
        }),
      });

      const data = await res.json();
      setAiFollowUp(data.response || 'No follow-up response.');
      const followup = data.response || 'No follow-up response.';
      setAiFollowUp(followup);
      speakText(followup);

    }

    catch (error) {
      console.error('Error getting follow-up:', error);
      setAiFollowUp('Something went wrong while fetching follow-up.');
    }
  };

  return (
    <div className="interview-container">
      <div className="left-panel">
        <video ref={videoRef} autoPlay muted className="video-feed" />
        {!cameraOn && <p>Waiting for camera permission...</p>}

        <div className="user-response">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type or speak your answer..."
            rows="4"
          />
          <div className="mic-controls">
            <button onClick={handleMicInput} className="btnn mic-btn">🎤 Start Speaking</button>
            <button className="btnn" onClick={handleSendAnswer}>Send</button>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="ai-message">
          <div className="emoji-avatar">🤖</div>
          <strong>MocqAI:</strong>
          <p>{aiQuestion}</p>
        </div>

        {aiFollowUp && (
          <div className="ai-message">
            
            <div className="ai-text">
              <strong>MocqAI (Follow-Up):</strong>
              <p>{aiFollowUp}</p>
            </div>
          </div>

        )}

      </div>
    </div>
  );
}
