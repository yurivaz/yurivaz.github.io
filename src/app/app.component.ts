import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder, Validators,FormControl} from '@angular/forms'
import {TodoService} from './todo.service'
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  todos : Todo[] = []
form: FormGroup = new FormGroup({
  descricao : new FormControl('', [Validators.required, Validators.minLength(4)])
})

constructor(private service : TodoService){


}

ngOnInit(): void {
 this.listarTodo()

}

listarTodo(){
  this.service.listar().subscribe(todoList => this.todos = todoList)
}

  submit(){
    const todo: Todo = {...this.form.value}
    this.service.salvar(todo).subscribe(savedtodo =>{
      this.todos.push(savedtodo)
      this.form.reset
    })
  }
  delete(todo: Todo){
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodo()
    })
  }

  tarefafeita(todo:Todo){
    this.service.marcarComoConcluido(todo.id).subscribe({
      next: (todoAtualizado)=>{
        todo.tarefaFeita = todoAtualizado.tarefaFeita
        todo.tarefaFeitaData  = todoAtualizado.tarefaFeitaData
      }
    })
  }

}
