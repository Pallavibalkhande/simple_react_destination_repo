export default class AppInitializer {
  static initializePlugins() {
    const firebase = require('firebase/app')
    firebase.initializeApp({})
  }
}