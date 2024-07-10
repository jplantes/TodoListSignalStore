import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { getState } from '@ngrx/signals';

import { v4 as uuidv4 } from 'uuid';

import { TodoStore } from '../../store/todo.store';
import { Todo } from '../../interfaces/todo.interface';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, JsonPipe],
  templateUrl: './todos.component.html',
})
export default class TodosComponent implements OnInit {

  readonly todoStore = inject(TodoStore)

  @ViewChild('inputTodo') inputTodo!: ElementRef;
    
  public listTodo = signal<Todo[]>([])
  
  ngOnInit(): void {}

  public addTodo() {
    const todo = this.createTodo( this.inputTodo.nativeElement.value );
    this.todoStore.newTodo( todo );
    this.inputTodo.nativeElement.value = '';
  }

  public updateTodo( todo: Todo ){
    const newTodo: Todo = {
      ...todo,
      complited: !todo.complited
    }

    this.todoStore.changeTodo( newTodo );
  }

  public deleteTodo( todo: Todo ) {
    this.todoStore.deleteTodo( todo );
  }

  public clearComplitedTodos() {
    const complitedTodos = this.todoStore.finishedTodo();
    complitedTodos.forEach( todo => this.deleteTodo( todo ) );
  }


  private createTodo(task: string): Todo {
    return {
      id: uuidv4(),
      task,
      complited: false,
    }
  }
}
