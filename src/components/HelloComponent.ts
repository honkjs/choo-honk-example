import html from 'choo/html';
import Component from 'choo/component';
import { MyServices } from '../stores/store';
import { IHonk } from '@honkjs/honk';
import { getServices } from '../stores/actions';
import { IComponentCache } from '../cache';

type HelloComponentProps = { id: string; name: string };

class HelloComponent extends Component {
  private prev?: string;

  constructor(private id: string, private cache: IComponentCache) {
    super(id);
    cache.set(id, this);
  }

  unload() {
    this.cache.remove(this.id);
  }

  createElement({ name }: HelloComponentProps) {
    this.prev = name;
    return html`<div>Hello, ${name}</div>`;
  }

  update({ name }: HelloComponentProps) {
    return this.prev !== name;
  }
}

const render = (honk: IHonk, props: HelloComponentProps) => {
  const { cache } = honk(getServices);
  const cid = 'Hello' + props.id;
  const comp = cache.get(cid) || new HelloComponent(cid, cache);
  return comp.render(props);
};

export default render;

/**
 * An alternative to using the component cache is to use the choo cache instead.
 * With the choo cache, the element won't be removed on unload.
 */
export function chooCacheHello(props: HelloComponentProps) {
  return function({ choo }: MyServices): HTMLElement {
    return choo.cache(HelloComponent, props.id).render(props);
  };
}
