type ListenerFn = (payload?: any) => void

export default class EventManager {
  private listeners

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: ListenerFn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener: ListenerFn) => {
      listener(payload);
    });
  }

  removeListener(event: string, listenerToRemove: ListenerFn) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener: ListenerFn) => listener !== listenerToRemove);

    this.listeners.set(event, filteredListeners);
  }
}
