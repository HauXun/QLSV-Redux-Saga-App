import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../components/Filters/FiltersSlice';
import todosSlice from '../components/TodoList/TodosSlice';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todosSlice.reducer,
  },
});

export default store;