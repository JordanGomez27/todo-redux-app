import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFisico') txtIputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    // this.cambiaDato();
    
    // this.todo.completado = false;

    // this.cambiaDato();

    this.chkCompletado = new FormControl( this.todo.completado );

    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {

      this.store.dispatch( actions.toggle( { id : this.todo.id } ) );

    });
  }

  cambiaDato():void{
    console.log( this.todo.completado );
    // this.todo.completado = true;
  }

  editar():void{

    console.log(this.txtIputFisico);

    this.editando = true;

    setTimeout(() => {
      this.txtIputFisico.nativeElement.select();
    }, 1);
    
  }

  terminarEdicion() : void {
    
    this.editando = false;

    if(this.txtInput.invalid) { this.txtInput.setValue( this.todo.texto ); return;}

    if(this.todo.texto === this.txtInput.value) return;

    this.store.dispatch( actions.editar( { id: this.todo.id, texto: this.txtInput.value } ) );

  }

  borrar() : void {
    this.store.dispatch( actions.borrar( { id: this.todo.id } ) )
  }
}
