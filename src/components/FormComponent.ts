import html from 'choo/html';
import Component from 'choo/component';
import { createHonkComponent } from '@honkjs/components';
import { MyServices } from '../stores/store';

type FormComponentProps = { id: string; onsubmit: (count: number) => void };

/**
 * A very simple form component.
 */
class FormComponent extends Component {
  private count: number = 0;
  private prev?: FormComponentProps;

  createElement(props: FormComponentProps) {
    this.prev = props;
    return html`
    <div>
      <h3>Field Value: ${this.count}</h3>
      <input value=${this.count} placeholder="Name" onblur=${this.handleChange} />
      <button type="button" onclick=${this.handleClick}>Update</button>
    </div>`;
  }

  update() {
    return false;
  }

  private handleClick = (e: any) => {
    if (this.prev) {
      this.prev.onsubmit(this.count);
    }
  };

  private handleChange = (e: any) => {
    e.preventDefault();
    this.count = parseInt(e.target.value);
    this.rerender();
  };
}

/**
 * When using honk components, the form will be unloaded when the component is unloaded.
 */
const create = createHonkComponent('Form', (services: MyServices, id: string, props: FormComponentProps) => {
  return new FormComponent();
});

export default create;

/**
 * An alternative to using @honkjs/components is to use the choo cache instead.
 * With the choo cache, the element won't be removed on unload.
 *
 * The downside of using honk a honk thunk for this is every time
 * this component is rendered, it creates a new function that has to
 * eventually be cleaned up by the GC.
 *
 * You can avoid this, of course, by not using honk at all to create the component.
 * Or, using the @honkjs/components helpers.
 */
export function chooCachedForm(props: FormComponentProps) {
  return function({ choo }: MyServices): HTMLElement {
    return choo.cache(FormComponent, props.id).render(props);
  };
}
