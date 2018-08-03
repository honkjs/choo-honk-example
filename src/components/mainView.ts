import html from 'choo/html';
import Count from './CountComponent';
import Hello from './HelloComponent';
import { MyServices } from '../stores/store';
import { incrementAction, setTitle, whereAmI } from '../stores/actions';

const TITLE = 'HONK 🚚 HONK ❤︎ choo 🚂 choo';

export default function view({ honk }: MyServices) {
  // adding this here so you can see the view only loads once.
  // the components control the refresh after that.
  console.log('loaded main');
  honk(setTitle(TITLE));

  return html`
    <body>
      <span>${honk(whereAmI)}</span>
      <a href="/test">test</a>
      <a href="/">main</a>
      <h1>${honk(Hello, { id: 'hello', name: 'Bob' })}</h1>
      <h2>${honk(Count, { id: 'count' })}</h2>
      <h2>${honk(dumbComponent)}</h2>
      <h2>${regularComponent('stuff')}</h2>
      <button onclick=${onclick}>Increment</button>
    </body>
  `;

  function onclick() {
    honk(incrementAction(2));
  }
}

function dumbComponent({ store }: MyServices) {
  // the calling component doesn't need to know about the dependencies of this component
  // this is a terrible example, but helps demonstrate honk's flexibility
  // of injecting the store where there might not be any.
  const count = store.getState().count;
  return html`<span>I'm a honked normal component. Count: ${count}</span>`;
}

function regularComponent(stuff: string) {
  // and of course, regular components are fine too.
  return html`<span>I'm a normal component. Stuff: ${stuff}</span>`;
}
