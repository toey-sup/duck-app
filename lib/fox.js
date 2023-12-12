export class Fox {
  static runningId = 0

  static setRunningId(loadingId) {
    Fox.runningId = loadingId
  }

  id = 0
  description = ''
  image = ''

  constructor(id, description, image) {
    if (!id) {
      Fox.runningId += 1
    }
    this.id = id ?? Fox.runningId
    this.description = description
    this.image = image
  }

  getImage() {
    return this.image
  }
  setDescription(newDescription) {
    this.description = newDescription
  }
}
