import { Injectable } from '@angular/core';
import { INote } from '../model/INote';
import { AngularFirestore, AngularFirestoreCollection,DocumentReference } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;

  public notes:INote[] = [

  ];
  
  constructor(private db: AngularFirestore, private loginS: LoginService) { 
    this.loginS.authServicePublic.authState.subscribe((user) => {
      if (user != null) {
        this.dbPath = `/users/${user.email}/notes`;
        this.notesRef = db.collection(this.dbPath);
        this.loadNotes();
      }
    });
  }
  
  private loadNotes() {
    this.notesRef.get().subscribe(d=>{
      let docs = d.docs;
      this.notes = docs.map(d=>{
        return {id:d.id,...d.data()};
      });
    });
  }
  
  public async createNote(newNote:INote){
    try{
      let {id,...newNoteWithoutID} = newNote;
      let dRef:DocumentReference<any> = await this.notesRef.add({...newNoteWithoutID});
      newNote.id=dRef.id;
      this.loadNotes();
    }catch(err){
      console.error(err);
    }
  }
  

  public createNoteWithKey(key:string,newNote:INote){
    return this.notesRef.doc(key).set(newNote, {merge: true}); //merge -> create if not exists, update if exists
  }

  public async removeNote(id:any){
    try {
      await this.notesRef.doc(id).delete();
      let newNotes = this.notes.filter((n)=>{
        return n.id!=id;
      });
      this.notes = newNotes;
    } catch(err) {
      console.error(err);
    }
  }

  public getNotes():INote[]{
    return this.notes;
  }

  public async updateNote(note:INote){
    try {
      if (note.id !== undefined) {
        await this.notesRef.doc(note.id.toString()).update(note);
        let n=this.notes.map(n=>{
          if(n.id==note.id){
            n.title=note.title;
            n.description=note.description;
          }
          return n;
        })
      } else {
        console.error('Note id is undefined');
      }
    } catch(err) {
      console.error(err);
    }
  }  
}