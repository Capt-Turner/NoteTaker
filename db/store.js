const fs=require('fs');
const uuid=require('uuid');
const util=require('util');

const readFileAsync=util.promisify(fs.readFile);
const writeFileAsync=util.promisify(fs.writeFile);

class Store{
    read(){
        return readFileAsync('db/db.json','utf8');
    }

    write(note){
        return writeFileAsync('db/db.json',JSON.stringify(note));
    }

    async getNotes(){
        const notes = await this.read();
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    };

    async addNote(note){
        const {title,text}=note;
        
        if(!title){
            throw new Error("Title of note cannot be blank!");
        }
        if(!text){
            throw new Error("There must be notes to add!");
        }

        const newNote={title,text,id:uuid()};

        const notes = await this.getNotes();
        const updatedNotes = [...notes, newNote];
        await this.write(updatedNotes);
        return newNote;
    };
}

module.exports=new Store();