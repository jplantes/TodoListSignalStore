import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Todo } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  #urlBase = 'http://localhost:3000/todos';

  #http = inject(HttpClient);


  getTodos() {
    return this.#http.get<Todo[]>( this.#urlBase );
  }

  newTodo( todo: Todo ) {
    return this.#http.post<Todo>( this.#urlBase, todo );
  }

  updateTodo( todo: Todo ) {
    return this.#http.patch<Todo>( `${this.#urlBase}/${ todo.id }`, todo );
  }

  deleteTodo( id: string ) {
    return this.#http.delete<Todo>( `${this.#urlBase}/${ id }` );
  }
}
