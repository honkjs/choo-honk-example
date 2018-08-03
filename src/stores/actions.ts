import { MyServices } from './store';

export function incrementAction(num: number) {
  return function({ store }: MyServices) {
    store.setState((state) => {
      // update the state immutable version.
      return {
        ...state,
        count: state.count + num,
      };
    });
  };
}

export function setCount(count: number) {
  return function({ store }: MyServices) {
    store.setState((state) => {
      // just directly mutate it.
      state.count = count;
      return state;
    });
  };
}

export function whereAmI({ choo }: MyServices) {
  return choo.route;
}

export function setTitle(title: string) {
  return function({ choo, emitter }: MyServices) {
    if (choo.title !== title) emitter.emit(choo.events.DOMTITLECHANGE, title);
  };
}
