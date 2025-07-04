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

export default function InterviewClient() {
  const videoRef = useRef(null);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'general';

  const [aiQuestion, setAiQuestion] = useState('Loading your first question...');
  const [cameraOn, setCameraOn] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFollowUp, setAiFollowUp] = useState('');
  const [conversation, setConversation] = useState([]);

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
            prompt: `You are MocqAI, a mock interviewer for a ${type} interview. 
Start the interview by asking a short (1-2 lines), beginner-level question in a professional tone.`,
          }),
        });

        const data = await res.json();
        const question = data.response || 'Could not load question. Try again.';
        setAiQuestion(question);
        speakText(question);
        setConversation([{ role: 'assistant', content: question }]);

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

    const updatedConversation = [
      ...conversation,
      { role: 'user', content: userAnswer }
    ];

    try {
      const promptText = `
You are MocqAI, an AI interviewer for a ${type} interview.
Conduct a professional mock interview step by step.

Here is the conversation so far:
${updatedConversation.map(c => `${c.role === 'user' ? 'User' : 'AI'}: ${c.content}`).join('\n')}

Now, based on this history:
- If the last answer is good, ask a deeper or next-level question (new topic or advanced concept).
- If the answer is weak or incomplete, give a short follow-up question or hint.

Respond in 1-2 lines max.
      `.trim();

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await res.json();
      const followup = data.response || 'No follow-up response.';

      setAiFollowUp(followup);
      speakText(followup);
      setConversation([...updatedConversation, { role: 'assistant', content: followup }]);
      setUserAnswer('');
    } catch (error) {
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
