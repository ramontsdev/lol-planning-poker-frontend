import { useEffect, useState, useCallback } from 'react';

import { Container } from './styles';

import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

type AddToast = {
  type: 'default' | 'success' | 'danger'
  text: string
  duration: number
}

type Message = {
  id: number
  text: string
  type: 'default' | 'success' | 'danger'
  duration: number
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }: AddToast) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
