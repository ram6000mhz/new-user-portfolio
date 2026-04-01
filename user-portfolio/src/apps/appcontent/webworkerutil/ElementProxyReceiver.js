import { EventDispatcher } from "three";

export class ElementProxyReceiver extends EventDispatcher {
    constructor() {
      super();
      this.style = {};
      this.width = 0;
      this.height = 0;
      this.left = 0;
      this.top = 0;
    }
    setPointerCapture() { }
    releasePointerCapture() { }
    getRootNode() {
      return this; 
    }

    get clientWidth() {
      return this.width;
    }

    get clientHeight() {
      return this.height;
    }

    getBoundingClientRect() {
      return {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
      };
    }

    focus() {}
    
    ownerDocument = this;
}