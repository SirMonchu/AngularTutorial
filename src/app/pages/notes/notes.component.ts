import { Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { INote } from '../../model/INote';
import { NoteComponent } from 'src/app/components/note/note.component';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
  @ViewChild('colorpicker') cp!: ElementRef;

  public color:string = '#fff';
  public page = 'Inicio';


  public notes:INote[] = [
    {title:'Nota1',description:"Hola Mundo"},
    {title:'Nota2',description:"Hello World"},
  ];

  constructor(public notesS:NotesService) { }

  ngOnInit(): void {
  }

  refresh(){
    location.reload();
  }
  cambiaCorlor($event:any){
   this.color=$event.target.value;
  }

  public removingNote($event:INote){
    console.log("Elminando Nota");
    this.notesS.removeNote($event.id)
  }
  public editingNote($event:INote){
    console.log("Editando Nota");
    console.log($event);
  }
  trackByNotes(index:number,item:INote){
    return item.id;
  }

}