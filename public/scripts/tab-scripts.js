const arrayifyRawInput = (input) => input = input.split('\r\n')
const fillNotesOnStrings = (raw) => {
    let notesOnStrings = []
    for(let i = 0; i < raw.length; i++) {
        notesOnStrings.push(raw[i].replaceAll(' ', '-'))
    }
    return notesOnStrings
}

export {
    arrayifyRawInput,
    fillNotesOnStrings,
}