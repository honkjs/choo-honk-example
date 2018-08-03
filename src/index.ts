import choo from 'choo';
import chooHonkStore from './stores/store';
import mainView from './components/mainView';
import testView from './components/testView';

var app = new choo();
app.use(chooHonkStore);
// use honk to initialize our views
app.route('/', (state) => state.honk(mainView));
app.route('/test', (state) => state.honk(testView));
app.mount('body');
