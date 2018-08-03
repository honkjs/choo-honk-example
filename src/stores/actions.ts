import { MyServices } from './store';

export function incrementAction(num: number) {
  return function({ store }: MyServices) {
    store.setState((state) => {
      return {
        count: state.count + num,
      };
    });
  };
}

export function whereAmI({ choo }: MyServices) {
  return choo.href;
}

export function setTitle(title: string) {
  return function({ choo, emitter }: MyServices) {
    if (choo.title !== title) emitter.emit(choo.events.DOMTITLECHANGE, title);
  };
}
