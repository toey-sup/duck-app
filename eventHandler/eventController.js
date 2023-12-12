import { foxManagement } from '../lib/foxManagement.js'
import { foxInterface } from '../UI/Fox.js'
import { Fox } from '../lib/fox.js'
const { showFox, showLikedFoxCount, showUnlikeFoxCount, removeFox, showNewFox, updateFoxDescription } =
foxInterface()
const {
  addLikedFox,
  unlikeFox,
  getLikedFoxs,
  getNumberOfLikedFoxs,
  getNumberOfUnlikedFoxs,
  setFoxDescription,
  unlikeAllFoxs,
  loadFoxTinderData,
  getRandomFoxImage,
  unlikeNewFoxs,
} = foxManagement()

const unlikeButtonHandler = (event) => {
  const removeButtonFire = event.target
  const removeId = removeButtonFire.parentElement.getAttribute('id')
  unlikeFox(Number(removeId))
  removeFox(Number(removeId))
  showLikedFoxCount(getNumberOfLikedFoxs())
  showUnlikeFoxCount(getNumberOfUnlikedFoxs())
}

const addDescriptionButtonHandler = (event) => {
  const doneButtonFire = event.target
  const foxId = doneButtonFire.parentElement.getAttribute('id')
  const description =  prompt('Add Description')
  if (description) {
    setFoxDescription(foxId, description)
    updateFoxDescription(foxId, description)
  }
}

const addFoxButtonHandler = (foxId) => {
  document
    .getElementById(foxId)
    .children[2].addEventListener('click', addDescriptionButtonHandler)
  document
    .getElementById(foxId)
    .children[3].addEventListener('click', unlikeButtonHandler)
}

const showNewFoxHandler = async () => {
  const image = await getRandomFoxImage()
  showNewFox(image)
}

const likeNewFoxHandler = async () => {
  const foxImage = document.getElementById('newFoxImage').src
  await showNewFoxHandler();
  if (foxImage !== '') {
    const foxId = addLikedFox(undefined, '', foxImage)
    const addedFox = getLikedFoxs().find((f) => f.id === foxId)
    showFox(foxId, addedFox.description, addedFox.image)
    addFoxButtonHandler(foxId)
    showLikedFoxCount(getNumberOfLikedFoxs())
    showUnlikeFoxCount(getNumberOfUnlikedFoxs())
  }
}

const unlikeNewFoxHandler = async () => {
  await showNewFoxHandler();
  unlikeNewFoxs()
  showLikedFoxCount(getNumberOfLikedFoxs())
  showUnlikeFoxCount(getNumberOfUnlikedFoxs())
}

const beforeUnloadHandler = (event) => {
  event.preventDefault()
  localStorage.setItem('foxTinder', JSON.stringify({
    likedFoxs: getLikedFoxs(),
    unlikedFoxCount: getNumberOfUnlikedFoxs(),
    runningId: Fox.runningId,
  }))
}

const clearHandler = () => {
  const foxsDiv = document.getElementById('likedFoxs');
  foxsDiv.replaceChildren()
  unlikeAllFoxs()
}

const loadHandler = async () => {
  const storedData = localStorage.getItem('foxTinder')
  const foxTinderData  = JSON.parse(storedData)
  await showNewFoxHandler()

  if (foxTinderData) {
    loadFoxTinderData(foxTinderData.runningId, foxTinderData.likedFoxs, foxTinderData.unlikedFoxCount)
    getLikedFoxs().forEach((fox) => {
      showFox(fox.id, fox.description, fox.image)
      addFoxButtonHandler(fox.id)
    })
  }
  showLikedFoxCount(getNumberOfLikedFoxs())
  showUnlikeFoxCount(getNumberOfUnlikedFoxs())
  const likeNewFoxButton = document.getElementById('likeNewFoxButton');
  const unlikeNewFoxButton = document.getElementById('unlikeNewFoxButton');
  const clearButton = document.getElementById('clearFoxButton');
  likeNewFoxButton.addEventListener('click', () => likeNewFoxHandler())
  unlikeNewFoxButton.addEventListener('click', () => unlikeNewFoxHandler())
  clearButton.addEventListener('click', () => clearHandler())
}

export {
  unlikeButtonHandler,
  addDescriptionButtonHandler,
  beforeUnloadHandler,
  loadHandler
}
