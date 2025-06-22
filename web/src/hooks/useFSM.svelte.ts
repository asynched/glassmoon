type FSMOptions<T> = {
  states: T[];
  initial: T;
};

export function useFSM<K>({ initial, states }: FSMOptions<K>) {
  let state = $state(initial);

  return {
    state() {
      return state;
    },
    next() {
      const nextIndex = (states.indexOf(state) + 1) % states.length;
      state = states[nextIndex];
    },
  };
}
