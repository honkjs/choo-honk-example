import html from 'choo/html';
import { MyServices } from '../stores/store';
import { setTitle } from '../stores/actions';

const TITLE = 'Where am I?';

export default function view({ honk }: MyServices) {
  honk(setTitle(TITLE));
  return html`
    <body>
      <a href="/test">test</a>
      <a href="/">main</a>
      <h1>yo</h1>
    </body>
  `;
}
