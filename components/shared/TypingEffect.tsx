import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  texts: string[];
  speed?: number;
  pauseTime?: number;
  deleteSpeed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  speed = 150,
  pauseTime = 1500,
  deleteSpeed = 75,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentText = texts[textIndex];

    if (!isDeleting && charIndex <= currentText.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, charIndex));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (isDeleting && charIndex >= 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.slice(0, charIndex));
        setCharIndex(charIndex - 1);
      }, deleteSpeed);
    }

    if (charIndex === currentText.length + 1 && !isDeleting) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    }

    if (charIndex === -1 && isDeleting) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, pauseTime, deleteSpeed]);

  return <span className='cursive'>{displayedText}</span>;
};

export default TypingEffect;
