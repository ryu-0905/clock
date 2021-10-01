'use strict';
{
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  
  class Clock{
    constructor() {
      this.r = 200;
    }

    drowBackground(){
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, this.r, 0, 2*Math.PI);
      ctx.stroke();

      for(let i=0;i<360;i += 6){
        ctx.save();

        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i/180*Math.PI);
        if(i%30 === 0){
          ctx.font = 'bold 24px Verdana';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top'
          ctx.fillText(i/30 || 12, 0, -this.r + 20);
          ctx.lineWidth = 4;
        }
        ctx.beginPath();
        ctx.moveTo(0, -this.r);
        ctx.lineTo(0, -this.r + 15);
        ctx.stroke();

        ctx.restore();
      }
    }

    drowHand(){
      function drowHours(r, h, m){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate((h/6 + m/360) * Math.PI);
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r + 90);
        ctx.stroke();
        ctx.restore();
      }

      function drowMinute(r, m) {
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(m/30 * Math.PI);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r + 60);
        ctx.stroke();
        ctx.restore();        
      }

      function drowSeconds(r, s) {
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(s/30 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -r + 30);
        ctx.stroke();
        ctx.restore();        
      }

      drowHours(this.r, this.h, this.m);
      drowMinute(this.r, this.m);
      drowSeconds(this.r, this.s);
    }
    
    update(){
      const d = new Date();
      this.h = d.getHours();
      this.m = d.getMinutes();
      this.s = d.getSeconds();
    }
    
    run(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.update();
      this.drowBackground();
      this.drowHand();
      setTimeout(() => {
        this.run();
      }, 100);
    }
  }
  
  function main() {
    if(typeof canvas.getContext === undefined){
      return;
    }
    const clock = new Clock();
    clock.run();
  }
  main();
}