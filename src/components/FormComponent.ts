import html from 'choo/html';
import Component from 'choo/component';
import { IHonk } from '@honkjs/honk';
import { getServices } from '../stores/actions';
import { IComponentCache } from '../cache';

type FormComponentProps = { id: string; onsubmit: (count: number) => void };

/**
 * A very simple form component.
 */
class FormComponent extends Component {
  private count: number = 0;
  private prev?: FormComponentProps;

  constructor(private id: string, private cache: IComponentCache) {
    super(id);
    cache.set(id, this);
  }

  unload() {
    this.cache.remove(this.id);
  }

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

const render = (honk: IHonk, props: FormComponentProps) => {
  const { cache } = honk(getServices);
  const cid = 'Form' + props.id;
  const comp = cache.get(cid) || new FormComponent(cid, cache);
  return comp.render();
};

export default render;
