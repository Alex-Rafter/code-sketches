function switchableOutput({ mood = setMood(), name = 'dude' } = {}) {
    if (mood === 'happy') {
        return 'Good job, you!'
    } else if (mood === 'angry') {
        return 'Chill out, dude!'
    }
}

function setMood() {
    return 'happy'
}

console.log(switchableOutput())
