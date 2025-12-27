import React, { useState, useEffect, useRef } from 'react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: inputValue }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Hello! 👋 Thank you for your interest in the Physical AI & Humanoid Robotics textbook.  This book is a graduate-level resource designed to provide a comprehensive understanding of embodied intelligence, humanoid robot design, and the integration of advanced AI systems into physical agents.  You will explore core topics including:  The fundamentals of Physical AI, perception, and sensor integration.  Humanoid robotics, covering locomotion, manipulation, and control.  High-fidelity simulation pipelines using platforms like Unity and NVIDIA Omniverse.  ROS2 and robotics middleware for real-world system implementation.  Integration of visual-language models for perception, reasoning, and interaction.  Ethical and safe AI design principles for robotics applications.  Each chapter is structured to build knowledge step by step, providing theoretical foundations, practical examples, and simulation-based exercises to develop hands-on skills. Whether you are a student, researcher, or practitioner, this book aims to bridge the gap between theory and real-world robotics systems.  📘 Physical AI & Humanoid Robotics equips learners to understand, design, and implement complex AI-driven robotic systems, from fundamentals to advanced real-world applications.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {isOpen ? (
        <div
          style={{
            width: 390,
            height: 520,
            background: 'linear-gradient(160deg,#0f0f1a,#090015)',
            borderRadius: 18,
            boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              background:
                'linear-gradient(90deg,#ff4ecd,#7b5cff,#22d3ee)',
              color: '#fff',
              padding: '14px 16px',
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              letterSpacing: 0.3,
            }}
          >
            🤖 AI Textbook Assistant
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                borderRadius: 6,
                padding: '2px 8px',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              background:
                'linear-gradient(180deg,#0c0c1a,#050008)',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: 16,
                  background:
                    msg.role === 'user'
                      ? 'linear-gradient(135deg,#22d3ee,#7b5cff,#ff4ecd)'
                      : 'linear-gradient(135deg,#1f2937,#111827)',
                  color: '#fff',
                  alignSelf:
                    msg.role === 'user' ? 'flex-end' : 'flex-start',
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>{' '}
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  maxWidth: '70%',
                  padding: '10px 14px',
                  borderRadius: 16,
                  background:
                    'linear-gradient(135deg,#1f2937,#111827)',
                  color: '#aaa',
                  fontStyle: 'italic',
                }}
              >
                AI is thinking…
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: 12,
              display: 'flex',
              gap: 8,
              background:
                'linear-gradient(90deg,#0f0f1a,#12001f)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.15)',
                background: '#0b0b15',
                color: '#fff',
                outline: 'none',
                fontSize: 14,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '10px 18px',
                borderRadius: 10,
                border: 'none',
                background:
                  'linear-gradient(135deg,#22d3ee,#7b5cff,#ff4ecd)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: 62,
            height: 62,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg,#22d3ee,#7b5cff,#ff4ecd)',
            color: '#fff',
            border: 'none',
            fontSize: 26,
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
          title="Open AI Assistant"
        >
          🤖
        </button>
      )}
    </div>
  );
}
