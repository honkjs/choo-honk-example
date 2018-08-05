import html from 'choo/html';
import Count from './CountComponent';
import Hello from './HelloComponent';
import Form, { chooCachedForm } from './FormComponent';
import { MyServices } from '../stores/store';
import { incrementAction, setTitle, whereAmI, setCount } from '../stores/actions';

const TITLE = 'HONK 🚚 HONK ❤︎ choo 🚂 choo';

export default function view({ honk }: MyServices) {
  console.log('loaded main');
  honk(setTitle(TITLE));

  return html`
    <body>
      <a href="/test">test</a>
      <hr />
      <h1>${honk(Hello, { id: 'hello', name: 'World' })}</h1>
      <h2>${honk(Count, { id: 'count' })}</h2>
      <h2>${honk(dumbComponent)}</h2>
      <h2>${regularComponent('stuff')}</h2>
      <hr />
      <div>${honk(Form, { id: 'form1', onsubmit: onFormSubmit })}</div>
      <div>${honk(chooCachedForm({ id: 'form2', onsubmit: onFormSubmit }))}</div>
      <hr />
      <button onclick=${onclick}>Increment</button>
    </body>
  `;

  function onFormSubmit(count: number) {
    honk(setCount(count));
  }

  function onclick() {
    honk(incrementAction(2));
  }
}

/**
 * The calling component doesn't need to know about the dependencies of this component.
 * This is a pointless example, but helps demonstrate honk's flexibility
 * of injecting the store where there might not be any.
 */
function dumbComponent({ store }: MyServices) {
  const count = store.getState().count;
  return html`<span>I'm a honked stateless component. Count: ${count}</span>`;
}

/**
 * of course, you don't need to use honk to create regular stateless components.
 */
function regularComponent(stuff: string) {
  return html`<span>I'm a normal stateless component. Stuff: ${stuff}</span>`;
}
