import {Page} from '@core/Page';
import {CreateStore} from '@core/CreateStore';
import {rootReducer} from '@/store/rootReducer';
import {normalizeInitialState} from '@/store/initialState';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Header} from '@/components/header/Header';

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const stateName = `excel:${params}`;
    const state = storage(stateName);
    const initialState = normalizeInitialState(state);
    const store = new CreateStore(rootReducer, initialState);

    const stateListener = debounce(state => {
      storage(stateName, state);
    }, 300);

    store.subscribe(stateListener);

    // #app из шаблона html
    this.excel = new Excel( {

      // Регистрируем компонентов по порядку
      components: [
        Header, Toolbar, Formula, Table
      ],
      store
    });

    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
  }
}
