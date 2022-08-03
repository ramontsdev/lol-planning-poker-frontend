import EventManager from '../lib/event-manager';

export const toastEventManager = new EventManager();

type Message = {
  text: string
  type: 'default' | 'success' | 'danger'
  duration: number
}

export default function toast({ type, text, duration }: Message) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
