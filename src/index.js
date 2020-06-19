import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

// #app из шаблона html
const excel = new Excel('#app', {

  // Регистрируем компонентов по порядку
  components: [
    Header, Toolbar, Formula, Table
  ]
});

// Вызываем функцию рендер
excel.render();
