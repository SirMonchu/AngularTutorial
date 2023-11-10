import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit{

  constructor(private noteS:NotesService) { }

  ngOnInit(): void {
  }

  addNote($event:any){
    this.noteS.createNote($event);
  }

}
