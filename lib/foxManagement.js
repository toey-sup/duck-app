import { Fox } from './fox.js'

export function foxManagement() {
  let likedFoxs = [];
  let unlikeFoxCount = 0;

  async function getRandomFoxImage() {
    const data = await fetch('https://randomfox.ca/floof/');
    const fox = await data.json();
    return fox.image;
  }

  function addLikedFox(id, description, image) {
    const newFox = new Fox(id, description, image)
    likedFoxs.push(newFox);
    return newFox.id
  }

  function unlikeAllFoxs() {
    unlikeFoxCount += likedFoxs.length;
    likedFoxs = [];
  }

  function unlikeNewFoxs() {
    unlikeFoxCount += 1;
  }

  function unlikeFox(foxId) {
    unlikeFoxCount += 1;
    likedFoxs = likedFoxs.filter((likedFox) => likedFox.id !== foxId);
  }

  function getLikedFoxs() {
    return likedFoxs
  }

  function getNumberOfLikedFoxs() {
    return likedFoxs.length
  }

  function getNumberOfUnlikedFoxs() {
    return unlikeFoxCount
  }

  function setFoxDescription(foxId, description) {
    const foundFox = likedFoxs.find((fox) => fox.id === Number(foxId))
    if (foundFox !== undefined) {
      foundFox.setDescription(description)
    }
  }

  function loadFoxTinderData(userRunningId, userLikedFoxs, userUnlikedFoxsCount) {
    if (userRunningId) {
      Fox.setRunningId(Number(userRunningId))
    }
    if (userLikedFoxs) {
      userLikedFoxs.forEach((fox) => {
        addLikedFox(fox.id, fox.description, fox.image)
      })
    }
    unlikeFoxCount = Number(userUnlikedFoxsCount) ?? 0;
  }

  return {
    addLikedFox,
    unlikeAllFoxs,
    unlikeFox,
    getLikedFoxs,
    getNumberOfLikedFoxs,
    getNumberOfUnlikedFoxs,
    setFoxDescription,
    loadFoxTinderData,
    getRandomFoxImage,
    unlikeNewFoxs,
  }
}
