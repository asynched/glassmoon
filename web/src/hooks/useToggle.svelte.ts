export function useToggle(initial = false) {
  let toggle = $state(initial);

  return {
    state() {
      return toggle;
    },
    toggle() {
      toggle = !toggle;
    },
  };
}
