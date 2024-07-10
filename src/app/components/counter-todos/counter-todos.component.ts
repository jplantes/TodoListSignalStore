import { Component, inject } from '@angular/core';
import { TodoStore } from '../../store/todo.store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-counter-todos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './counter-todos.component.html',
  styles: ``
})
export default class CounterTodosComponent {

  readonly todoStore = inject(TodoStore)

}
