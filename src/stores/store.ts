import { IState } from 'choo';
import Honk from '@honkjs/honk';
import { IHonkStore, createStore } from '@honkjs/store';
import injector, { IHonkServices } from '@honkjs/injector';
import { createCache, IComponentCache } from '../cache';

export interface MyState {
  count: number;
}

export type MyServices = {
  store: IHonkStore<MyState>;
  choo: IState;
  emitter: any;
  cache: IComponentCache;
} & IHonkServices;

/**
 * I heard you liked middleware,
 * so I put middleware in your middleware.
 */
export default function store(state: IState, emitter: any) {
  // create our store
  const initState: MyState = {
    count: 0,
  };
  const store = createStore(initState);

  const honk = new Honk().use(
    injector({
      store,
      cache: createCache(),
      choo: state,
      emitter: emitter,
    })
  ).honk;

  // make honk available to choo
  state.honk = honk;
}
