import React, { Component } from 'react'
import Note from './Note/Note.js'
import NoteForm from './NoteForm/NoteForm.js'
import './App.css'
import {FB_CONFIG} from   './Config/config'
import firebase from 'firebase/app'
import 'firebase/database'

class App extends Component {
 
  constructor(props) {
    super(props)
    this.addNote = this.addNote.bind(this)
    this.removeNote = this.removeNote.bind(this);
    this.app = firebase.initializeApp(FB_CONFIG)
    this.database = this.app.database().ref().child('notes') //reference to database

    //Setting up the React state of the component
      this.state = {
        notes: []
    }
  }

  componentWillMount() {
    const previousNotes = this.state.notes

    /*any time we read data from the db we recieve that data as a datasnapshot object. 
     * this is passed to the callbacks. we can inspect it using the val method */
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      })
      //updating the state of the component
      this.setState({
        notes: previousNotes
      })
    })
    //when the child_removed event occurs, we get a data snapshot in return(snap)
    //we will loop through our prefvious Notes array, for any instance in that array where the id is equal to the key
    //that comes back in the datasnapshot, splice that out of our previous notes array
    this.database.on('child_removed', snap => {
      for(var i = 0; i < previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })

    })
  }

  addNote(note) {
    this.database.push().set({  noteContent: note })
  }

  removeNote(noteId) {
    this.database.child(noteId).remove()
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading"> TO-DO list </div>
        </div>
        <div className="notesBody">
        {
          this.state.notes.map((note) => {
            return( 
              <Note noteContent={note.noteContent} 
              noteId={note.id} 
              key={note.id}
              removeNote={this.removeNote}/> //props
            )
          })
        }
        </div>
        <div className="notesFooter">
        <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App
