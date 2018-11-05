import html from 'choo/html';
import Component from 'choo/component';
import { IHonkStore, IUnsubscribe } from '@honkjs/store';
import { MyState } from '../stores/store';
import { IHonk } from '@honkjs/honk';
import { getServices } from '../stores/actions';
import { IComponentCache } from '../cache';

/**
 * A very manual way to subscribe/unsubscribe from the store from a component.
 * Redux's connect creates containers like these when you use connect().
 * You don't save much boilerplate by using a connect type function,
 * since you need mapToProps, and it creates a lot of 'magic',
 * so preferring explicit sub/unsub component for now.
 *
 * At some point in the future, a @honkjs/choo-connect might be created.
 */
export class CountContainer extends Component {
  private unsub?: IUnsubscribe;
  private count: number;

  constructor(public id: string, private cache: IComponentCache, private store: IHonkStore<MyState>) {
    super(id);

    // register with the cache
    cache.set(id, this);

    // initial state
    this.count = store.getState().count;
  }

  createElement() {
    return countElement(this.count);
  }

  update() {
    return false;
  }

  load() {
    this.unsub = this.store.subscribe((state) => {
      this.count = state.count;
      this.rerender();
    });
  }

  unload() {
    this.unsub && this.unsub();
    this.cache.remove(this.id);
  }
}

/**
 * It's good practice to limit what's going on in the container components.
 * Instead, create implementations as if they are stateless.
 */
export function countElement(count: number) {
  return html`<span>I'm wrapped in a container component. Count: ${count}</span>`;
}

/**
 * The render function is used to create this component when used with honk.
 * Note:  There are a bunch of different ways about maintaining components in choo.
 *
 * @param honk
 * @param id
 */
const render = (honk: IHonk, id: string) => {
  // get the services we need from honk
  const { cache, store } = honk(getServices);

  // create a unique component id
  const cid = 'Count' + id;

  // get or create the component
  const comp = cache.get(cid) || new CountContainer(cid, cache, store);

  return comp.render();
};

export default render;
