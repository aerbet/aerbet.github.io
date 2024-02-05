class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining  = 0;
    
    this.isPlayerControlled = config.isPlayerControlled || false;
    
    this.directionUpdate = {
      'up': ['y', -0.25],
      'down': ['y', 0.25],
      'left': ['x', -0.25],
      'right': ['x', 0.25],
    }
  }
  
  update(state) {
    this.updatePosition();
    this.updateSprite(state);
    
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
  }
  
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
  
  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
      this.sprite.setAnimation('idle-' + this.direction);
    }
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation('walk-' + this.direction);
    }
  }
}