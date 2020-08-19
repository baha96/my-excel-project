import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/store/rootReducer';
import {CreateStore} from '@core/CreateStore';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/store/initialState';

const store = new CreateStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage('excel-state', state);
}, 300);

store.subscribe(stateListener);

// #app из шаблона html
const excel = new Excel('#app', {

  // Регистрируем компонентов по порядку
  components: [
    Header, Toolbar, Formula, Table
  ],
  store
});

// Вызываем функцию рендер
excel.render();
