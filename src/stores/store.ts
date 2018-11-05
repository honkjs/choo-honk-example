import { IState } from 'choo';
import Honk, { IHonkServices } from '@honkjs/honk';
import { IHonkStore, createStore } from '@honkjs/store';
import injector from '@honkjs/injector';
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

  const honk = new Honk().use(injector()).use((app, next) => {
    // add our store to services
    app.services.store = store;

    // a custom component cache
    app.services.cache = createCache();

    // and the choo state and emitter.
    app.services.choo = state;
    app.services.emitter = emitter;

    return next;
  }).honk;

  // make honk available to choo
  state.honk = honk;
}
