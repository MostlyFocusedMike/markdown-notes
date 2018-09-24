import marked from 'marked' 

class JournalWriter {
  constructor(root = "markdown") {
    this.notes = {};
    this.root = root 
  }
  addJournal({journalTitle, folder, sections, fileIndexed}) {
    this.notes[journalTitle] = []
    sections.map((sectionTitle, idx) => {
      const dashed = sectionTitle.replace(/ /g, "-").toLowerCase()
      const fileName = fileIndexed ? `${idx}-${dashed}` : dashed
      const path = `${this.root}/${folder}`
      const file = require("./" + `${path}/${fileName}.md`)
      this.notes[journalTitle].push({
        sectionTitle: sectionTitle,
        link: dashed,
        text: `\n# ${sectionTitle}\n${file}\n`,
      })
    })
  }

  addJournals(journals) {
    journals.map(journal => this.addJournal(journal))
  }

  journalText(journalTitle) {
    return marked(this.notes[journalTitle].map(note => note.text).join(''))
  }
  journalSections(journalTitle, numbered) {
    return this.notes[journalTitle].map((n, idx) => {
      const text = numbered ? `${idx + 1} ${n.sectionTitle}` : n.sectionTitle 
      return `<a href="#${n.link}">${text}</a>`
    }).join('')
  }
}

// const journals = [
//   {
//     journalTitle: "R Notes",
//     folder: "dummy/r-notes",
//     sections: [
//       "Intro to R",
//       "Vectors",
//     ]
//   }, 
//   {
//     journalTitle: "Javascript Notes",
//     folder: "js-notes",
//     sections: [
//       "Intro to JS",
//       "numbers",
//     ]
//   }
// ]
  

const myNotes = new JournalWriter
console.log(myNotes.root)

myNotes.addJournals(journals)

document.write(myNotes.journalText("R Notes"))

document.write(myNotes.journalSections("R Notes", true))

document.write(myNotes.journalText("Javascript Notes"))
document.write(myNotes.journalSections("Javascript Notes"))

fetch("notes/r-notes/0-intro-to-r.md")
  .then(response => response.text())
  .then(result => {
    document.write(result)
    console.log(result)
  });

document.write(myNotes.text())

.innerHTML = myNotes.tableOfContents()
document.getElementById("notes").innerHTML = myNotes.text()


export default JournalWriter
