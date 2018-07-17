import React, {Component} from 'react';
import './NoteForm.css'
import '../App.js'

class NoteForm extends Component {
    constructor(props) {
        super(props)
        this.handleUserInput = this.handleUserInput.bind(this) //binding the method to the component
        this.writeNote = this.writeNote.bind(this)
       
        this.state = {
            newNoteContent: ''
        }
    }


    //When the user gives new input, set newNoteContent to the value
    //of what is in the input box
    handleUserInput(event) {
        this.setState({
            newNoteContent: event.target.value //te value the text input from the user
        })
    }

    writeNote() {
        //call a method that sets the noteContent of the note to the value input
        this.props.addNote(this.state.newNoteContent)
        //to empty out the input box after writeNote() takes place
        this.setState({
            newNoteContent: ''
        })
    }

    render() {
        return(
            <div className="formWrapper">
                <input className="noteInput"
                placeholder="Write a new note..."
                value={this.state.newNoteContent} 
                onChange={this.handleUserInput}/>{/*to handle use input */}
                <button className="noteButton"
                onClick={this.writeNote}>New Note</button>
            </div>
        )
    }
}

export default NoteForm;