import html from 'choo/html';
import Component from 'choo/component';
import { createHonkComponent } from '@honkjs/components';
import { IHonkStore, IUnsubscribe } from '@honkjs/store';
import { MyServices, MyState } from '../stores/store';

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

  constructor(public id: string, private store: IHonkStore<MyState>) {
    super(id);
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
  }
}

/**
 * It's good practice to limit what's going on in the container components.
 * Instead, create implementations as if they are stateless.
 */
export function countElement(count: number) {
  return html`<span>I'm wrapped in a container component. Count: ${count}</span>`;
}

const create = createHonkComponent('CountContainer', ({ store }: MyServices, id: string) => {
  return new CountContainer(id, store);
});

export default create;
