import Component from 'choo/component';

/**
 * Describes a simple cache
 */
export interface IComponentCache {
  get: (id: string) => Component;
  set: (id: string, component: Component) => void;
  remove: (id: string) => void;
}

/**
 * Creates a simple component cache.
 *
 * @export
 * @returns {IComponentCache}
 */
export function createCache(): IComponentCache {
  const cache: any = {};

  function get(id: string) {
    return cache[id];
  }

  function set(id: string, component: Component) {
    cache[id] = component;
  }
  function remove(id: string) {
    delete cache[id];
  }

  return {
    get,
    set,
    remove,
  };
}
