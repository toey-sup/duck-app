function foxInterface() {
  function showNewFox(image) {
    const newFoxImage = document.getElementById('newFoxImage')
    newFoxImage.src = image
    newFoxImage.width = 200
    newFoxImage.height = 200

  }

  function showFox(id, description, image) {
    const likedFoxsDiv = document.getElementById('likedFoxs')

    const foxDiv = document.createElement('div')
    foxDiv.className = 'fox'
    foxDiv.setAttribute('id', id)

    //create new <p>
    const foxImage = document.createElement('img')
    foxImage.src = image
    foxImage.width = 200
    foxImage.height = 200
    foxDiv.appendChild(foxImage)

    //create new <p>
    const foxDescription = document.createElement('p')
    foxDescription.textContent = description
    foxDiv.appendChild(foxDescription)

    //create done button
    const addDescriptionButton = document.createElement('button')
    addDescriptionButton.textContent = 'Add Description'
    foxDiv.appendChild(addDescriptionButton)

    //create remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'unlike'
    removeButton.id = 'unlikeFoxButton'
    foxDiv.appendChild(removeButton)

    likedFoxsDiv.appendChild(foxDiv)
  }

  function showLikedFoxCount(likedCount) {
    const doneP = document.getElementById('likedCount')
    doneP.textContent = `Number of Liked Foxs:${likedCount}`
  }

  function showUnlikeFoxCount(unlikedCount) {
    const notDoneP = document.getElementById('unlikedCount')
    notDoneP.textContent = `Number of Unliked Foxs:${unlikedCount}`
  }

  function removeFox(foxId) {
    const removingNode = document.getElementById(foxId);
    removingNode.remove();
  }

  function updateFoxDescription(foxId, description) {
    const foxDescription = document.getElementById(foxId).children[2]
    foxDescription.textContent = description
  }
  return { showFox, showLikedFoxCount, showUnlikeFoxCount, removeFox, showNewFox, updateFoxDescription }
}
export { foxInterface }
