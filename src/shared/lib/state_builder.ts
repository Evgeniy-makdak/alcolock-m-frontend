import { Event, Store, createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react';

export class StateBuilder<T> {
  $store: Store<T>;
  setState: Event<any>;
  resetStore: Event<void>;
  constructor(initValue: T | null = null) {
    this.$store = createStore<T>(initValue);
    this.setState = createEvent();
    this.resetStore = createEvent();

    this.$store.on(this.setState, (_state, payload) => payload).reset(this.resetStore);
  }

  createHooks() {
    return {
      useValue: () => useStore(this.$store),
      useSetValue: () => useEvent(this.setState),
      useReset: () => useEvent(this.resetStore),
      useState: () => [useStore(this.$store), useEvent(this.setState), useEvent(this.resetStore)],
    };
  }
}
