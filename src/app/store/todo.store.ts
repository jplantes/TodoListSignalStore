import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from '@ngrx/operators';
import { concatMap, exhaustMap, mergeMap, pipe, tap } from "rxjs";

import { TodosService } from "../services/todos.service";

import { Todo } from "../interfaces/todo.interface";


type TodoState = {
  todos: Todo[],
  state: 'Loading' | 'Loaded' | 'Error',
}

const initialState: TodoState = {
  todos: [],
  state: 'Loading',
}

export const TodoStore = signalStore(
  // Se provee en el contexto global
  { providedIn: 'root' },
  // Inicializo el state
  withState(initialState),

  withComputed((store) => ({
    countTodos: computed( () => store.todos().length ),
    finishedTodo: computed( () => store.todos().filter( todo => todo.complited === true ) ),
    pendingTodo: computed( () => store.todos().filter( todo => todo.complited === false ) ),
  })),
  
  // Metodos
  withMethods(( store, todoServices = inject(TodosService) ) => ({
    // Obtener todos las tareas
    getTodos: rxMethod<Todo[]>(
      pipe(
        tap( () => patchState( store, {state: 'Loading'} ) ),
        exhaustMap( () => {
          return todoServices.getTodos().pipe(
            tapResponse({
              next: (todos) => patchState(store, { todos, state: 'Loaded' }),
              error: () => patchState( store, {state: 'Error'} ),
            })
          )
        })
      )
    ),
    
    // Crear una nueva tarea
    newTodo: rxMethod<Todo>(
      pipe(
        concatMap( (todo) => {
          return todoServices.newTodo( todo ).pipe(
            tapResponse({
              next: (newTodo) => patchState(store, { todos: [...store.todos(), newTodo] }),
              error: () => patchState( store, {state: 'Error'} ),
            })
          )
        })
      )
    ),

    // Cambiar estado tarea
    changeTodo: rxMethod<Todo>(
      pipe(
        concatMap( (todo) => {
          return todoServices.updateTodo( todo ).pipe(
            tapResponse({
              next: ( respUpdate ) => {
                const changeStore = store.todos().map( todoMap => todoMap.id === respUpdate.id ? respUpdate : todoMap );
                patchState( store, { todos: [...changeStore] });
              },
              error: () => patchState( store, {state: 'Error'} ),
            })
          )
        })
      )
    ),


    // Eliminar tarea
    deleteTodo: rxMethod<Todo>(
      pipe(
        mergeMap( (todo) => {
          return todoServices.deleteTodo( todo.id ).pipe(
            tapResponse({
              next: () => {
                const filteTodo = store.todos().filter( todoFilter => todoFilter.id !== todo.id );
                patchState( store, { todos: [...filteTodo] });
              },
              error: () => patchState( store, {state: 'Error'} ),
            })
          )
        })
      )
    ),

  }))
)