import html from 'choo/html';
import Component from 'choo/component';
import { createHonkComponent } from '@honkjs/components';
import { IHonkStore, IUnsubscribe } from '@honkjs/store';
import { MyServices, MyState } from '../stores/store';

/**
 *  a very explicit way to subscribe/unsubscribe from the store from a component
 *  redux's connect creates containers like these when you use connect();
 *  you don't save much boilerplate by using a connect type function,
 *  since you need mapToProps, etc, and creates a lot of 'magic',
 *  so preferring explicit sub/unsub component for now.
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
    // no props so handles its own updates
    return false;
  }

  load() {
    // sub when loaded
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
 * It's good practice to limit anything in the container components.
 * Instead, create implementations as if they are stateless.
 */
export function countElement(count: number) {
  return html`<span>I'm a smart component. Count: ${count}</span>`;
}

const create = createHonkComponent('CountContainer', ({ store }: MyServices, id: string) => {
  return new CountContainer(id, store);
});

export default create;
