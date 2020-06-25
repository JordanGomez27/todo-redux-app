import { createReducer, on } from '@ngrx/store';
import * as Action from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de IronMan'),
  new Todo('Robar escudo del Capitán America'),
  new Todo('Descanzar muy reció'),
];

const _todoReducer = createReducer(
  estadoInicial,

  on(Action.crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(Action.toggle, (state, { id }) => {
    return state.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return {
          ...todo,
        };
      }
    });
  }),

  on(Action.editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return {
          ...todo,
        };
      }
    });
  }),

  on(Action.borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),

  on(Action.toggleAll, (state, { completado }) =>
    state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    })
  ),

  on(Action.limpiarTodo, state => state.filter( todo => !todo.completado) )

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
