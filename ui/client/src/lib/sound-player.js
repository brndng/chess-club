export default class SoundPlayer {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = this.play.bind(this);
  }

  play() {
    this.sound.play();
  }
}

// "http://freesound.org/data/previews/351/351518_4502687-lq.mp3"
// "http://freesound.org/data/previews/333/333608_5890169-lq.mp3"




