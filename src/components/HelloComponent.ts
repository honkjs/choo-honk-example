import html from 'choo/html';
import Component from 'choo/component';
import { createHonkComponent } from '@honkjs/components';
import { MyServices } from '../stores/store';

type HelloComponentProps = { id: string; name: string };

/**
 * The main implementation is just a standard choo component.
 * It can be tested and used just like normal.
 */
class HelloComponent extends Component {
  private prev?: string;

  createElement({ name }: HelloComponentProps) {
    this.prev = name;
    return html`<div>Hello, ${name}</div>`;
  }

  update({ name }: HelloComponentProps) {
    return this.prev !== name;
  }
}

/**
 * The hello component doesn't need anything from services, but they're available.
 * Id will be prefixed by the component name (in this case 'Hello') when added to the cache.
 * When the Id is passed into the component, it's already been prefixed.
 * Props are the same props that were passed into honk(creator, props).
 */
const create = createHonkComponent('Hello', (services: MyServices, id: string, props: HelloComponentProps) => {
  return new HelloComponent();
});

/**
 * Following the react/redux pattern, export the wrapped component by default.
 */
export default create;
