import marked from 'marked' 

class NotePublisher {
  constructor(path, names, config = {}) {
    this.names = names;
    this.fileIndexed = config.fileIndexed;
    this.root = config.root || "notes"
    this.path = `${this.root}/${path}`;
  }

  text() {
    const promises = []
    this.names.map((name, idx) => {
      const fileName = this.fileIndexed ? `${idx + 1}-${this._dashed(name)}` : this._dashed(name)
      const promise = fetch(`${this.path}/${fileName}.md`)
        .then(response => response.text())
        .then(text => `\n# ${name}\n ${text}`)
      promises.push(promise)
    })
    return Promise.all(promises).then(values => {
      return marked(values.join()))
    }).catch(console.log)
  }

  tableOfContents(config) {
    return this.names.map((name, idx) => {
      let text;
      if (config.indexed) {
        text = `${idx + 1}. ${name}`
      } else if (config.character) {
        text = `${config.character}${name}`;
      } else {
        text = name;
      }
      return `<a href="#${this._dashed(name)}">${text}</a>`
    }).join('')
  }

  _dashed(str) {
    return str.replace(/ /g, "-").toLowerCase()
  }
}

export default NotePublisher
