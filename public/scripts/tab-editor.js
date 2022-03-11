// This is a giant mess right now
let inputArea = document.querySelector('#rawInput')
let shadow = document.querySelector('#tabGrid')
let editing = document.querySelector('edit')


let firstCol = [0, 41, 82, 123, 164, 205]
let secondToLast = [38, 79, 120, 161, 202, 243]


const fillInput = (area, c) => {
  for(let i = 0; i < 6; i++) {
      area.value += c
    for(let j = 0; j < 39; j++) {
      area.value += c
    }
    if (i !== 5) {
      area.value += '\n'  
    }
  }
}

const splitInput = () => {
	let a = []
  for(let i = 0; i < 240; i += 42) {
  	a.push(t.value.slice(i, i + 41))
  }
  return a
}

const replaceCharAt = (str, position, char) => {
  // turn string into array
  let a = [...str]
  // replace element at position
  a[position] = char
  // return array as string
  str = a.join('')
  return str
}

if(inputArea.value === "") {
  fillInput(inputArea, ' ')
}

if(shadow.value === "") {
  fillInput(shadow, '-')
}

inputArea.addEventListener('keydown', (evt) => {

  if(evt.code.startsWith('Arrow')) {
    // do nothing 
    // console.log('position', inputArea.selectionStart)
  } else if(evt.code.startsWith('D')) {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, evt.code.slice(5,6))
    shadow.value = replaceCharAt(shadow.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else if (evt.code === 'Backspace') {
      let cursorPos = inputArea.selectionStart
      evt.preventDefault()
      if(!firstCol.includes(cursorPos)) {
        shadow.value = replaceCharAt(shadow.value, cursorPos - 1, '-')
        inputArea.value = replaceCharAt(inputArea.value, cursorPos - 1, ' ')
        inputArea.selectionStart = cursorPos - 1
        inputArea.selectionEnd = cursorPos - 1
      }
  } else if (evt.code === 'KeyD') {
    evt.preventDefault()
    let positions = []
    
    // console.log('position', inputArea.selectionStart)
    // get all the positions
    for(let goingDown = inputArea.selectionStart - 41; goingDown >= 0; goingDown -= 41) {
      positions.push(goingDown)
    }
    positions.push(inputArea.selectionStart)
    for(let goingUp = inputArea.selectionStart + 41; goingUp <= 241; goingUp += 41) {
      positions.push(goingUp)
    }
    positions.sort((a,b) => {
      return a - b
    })
    // console.log(positions)
    // nothingto past behind 0 col
    if(positions[0] === 0) {
      return
    }

    // get all the characters behind the position
    let chars = []
    let cursor =  inputArea.selectionStart
    let a = [...inputArea.value]
    positions.forEach(pos => {
      if(a[pos - 1] !== ' ') {
        shadow.value = replaceCharAt(shadow.value, pos + 1, ' ')
      }
      inputArea.value = replaceCharAt(inputArea.value, pos + 1, inputArea.value[pos - 1])
      inputArea.selectionStart = cursor
      inputArea.selectionEnd = cursor
    })
    inputArea.selectionStart = cursor + 2
    inputArea.selectionEnd = cursor + 2
  } else if(evt.code === 'KeyP' || evt.code === 'KeyH') {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, evt.code.slice(3,4).toLowerCase())
    shadow.value = replaceCharAt(shadow.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else if(evt.code === 'Slash') {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, '/')
    shadow.value = replaceCharAt(shadow.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else if(evt.code === 'Space') {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else if(evt.code === 'Slash') {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, '/')
    shadow.value = replaceCharAt(shadow.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else if(evt.code === 'KeyX') {
    evt.preventDefault()
    let cursorPos = inputArea.selectionStart
    if(cursorPos === 40 || cursorPos === 81 || cursorPos === 122 || cursorPos === 163 || cursorPos === 204) {
      cursorPos += 1
    } else if ( cursorPos === 245) {
      return
    }
    inputArea.value = replaceCharAt(inputArea.value, cursorPos, 'x')
    shadow.value = replaceCharAt(shadow.value, cursorPos, ' ')
    inputArea.selectionStart = cursorPos + 1
    inputArea.selectionEnd = cursorPos + 1

  } else {
      evt.preventDefault()
  }

})

inputArea.addEventListener('paste', (event) => {
  event.preventDefault();
});