import { Component, inject, OnInit } from '@angular/core';
import  TodosComponent  from './components/todos/todos.component';
import { RouterModule } from '@angular/router';
import { TodoStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule ,TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  readonly todoStore = inject(TodoStore)
  
  ngOnInit(): void {
    console.log( this.todoStore.state() );
    if( this.todoStore.countTodos() === 0 ) {
      this.todoStore.getTodos([]);
    }
    console.log( this.todoStore.state() );
  }
  

}
