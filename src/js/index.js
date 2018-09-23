import marked from 'marked' 

class NoteWriter {
  constructor(path, names, fileIndexed) {
    this.path = path;
    this.names = names;
    this.fileIndexed = fileIndexed;
  }
  text() {
    const promises = []
    this.names.map((name, idx) => {
      const dashed = name.replace(/ /g, "-").toLowerCase()
      const foo = fetch(`notes/r-notes/${idx}-${dashed}.md`)
        .then(response => response.text())
      promises.push(foo)
    })
    return Promise.all(promises).then(values => {
      return values.join()
    })
  }
  // tableOfContents(numbered) {
  //   return this.rawNotes.map(n => {
  //     const text = numbered ? `${idx + 1} ${n.name}` : n.name 
  //     return `<a href="#${n.link}">${text}</a>`
  //   }).join('')
  // }
}

const myNotes = new NoteWriter("r-notes", [
  "Intro to R",
  "Vectors", 
  "Matrices",
  "Factors",
], true)

myNotes.text().then(res => {
  document.write(marked(res))
})

// fetch("notes/r-notes/0-intro-to-r.md")
//   .then(response => response.text())
//   .then(result => {
//     document.getElementById("contents").innerHTML = marked(result)
//     console.log(result)
//   });

// document.write(myNotes.text())

// .innerHTML = myNotes.tableOfContents()
// document.getElementById("notes").innerHTML = myNotes.text()


// export default NoteWriter
