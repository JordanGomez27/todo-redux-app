import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as Actions from '../../filtro/filtro.actions';
import { limpiarTodo }  from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: Actions.filtrosValidos = 'pendientes';
  filtros: Actions.filtrosValidos[] = ['completados', 'pendientes', 'todos'];

  pendientes: number = 0;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    // this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro);

    this.store.subscribe( state => {
      this.filtroActual = state.filtro,
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })

  }

  cambiarFiltro(filtro : Actions.filtrosValidos) : void {

    this.store.dispatch( Actions.setFiltro( { filtro }) )

  }

  limpiarCompletados() : void {
    this.store.dispatch( limpiarTodo() );
  }
}