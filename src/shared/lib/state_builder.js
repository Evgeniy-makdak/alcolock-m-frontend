import { createEvent, createStore } from 'effector';
import { useEvent, useStore } from 'effector-react';

export default class StateBuilder {
  constructor(initValue = null) {
    this.$store = createStore(initValue);
    this.setState = createEvent();
    this.resetStore = createEvent();

    this.$store.on(this.setState, (state, payload) => payload).reset(this.resetStore);
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
