let osc, playing, frequ, ampl;
  
  function setup() {
  let cnv = createCanvas(1000, 1000);
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
  
  reverb = new p5.Reverb();
  osc.disconnect(); // so we'll only hear reverb...

  // 3 second reverbTime, decayRate of 2%
  reverb.process(osc, 2, 2);
}

function draw() {
  background(137, 207, 240)
  let dryWet = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
  frequ = constrain(map(mouseX, 0, width, 85, 1000), 85, 1000);
  ampl = constrain(map(mouseY, height, 1, 1, 1), 1, 1);

   textSize(19);
    textStyle(BOLD);
   textFont('Courier New');
  textAlign(CENTER);
  text('Hold down mouse and move for a whale call!', 20, 20);
   textSize(14);
  textStyle(NORMAL);
  text('Frequency: ' + frequ, 20, 40);
   textSize(14);
  text('Amp: ' + ampl, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(frequ, 0.3);
    osc.amp(ampl, 0.3);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}