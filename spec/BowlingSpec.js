describe('BowlingScore', function(){

  beforeEach(function(){
    bowlingScore = new BowlingScore
  });

  var bowlingScore

  it('starts at 0', function(){
    expect(bowlingScore.score).toBe(0);
  });

  it('starts at frame 1', function(){
    expect(bowlingScore.currentFrame).toEqual([]);
  });

  it('starts with 10 pins', function(){
    expect(bowlingScore.framePinCount).toBe(10);
  });

  it('starts at ball per frame one', function(){
    expect(bowlingScore.currentBall).toBe(1);
  });


  describe('roll', function(){

    it('increments currentBall ', function(){
      bowlingScore.recordRoll(1);
      expect(bowlingScore.currentBall).toBe(2);
    });

    it('adds frame to frame after 2 ball rolled', function(){
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(1);
      expect(bowlingScore.bowlingFrames).toEqual([[1,1]]);
    });

    it('reduces framePinCount', function(){
      bowlingScore.recordRoll(1);
      expect(bowlingScore.framePinCount).toEqual(9);
    });

    it('reduces framePinCount', function(){
      bowlingScore.recordRoll(5);
      expect(bowlingScore.framePinCount).toEqual(5);
    });

    it('does not allow > 10 pins per frame', function(){
      expect(function() {bowlingScore.recordRoll(11)} ).toThrow(new Error("only 10 pins per frame"));
    });

    it('moves onto next frame after 2 balls', function(){
      bowlingScore.recordRoll(5);
      bowlingScore.recordRoll(5);
      expect(bowlingScore.currentFrameNumber()).toBe(1);
    });

    it('moves onto next frame if strike', function(){
      bowlingScore.recordRoll(10);
      expect(bowlingScore.currentFrameNumber()).toBe(1);
    });

    it('calculates score with no strike or spare', function(){
      bowlingScore.recordRoll(5);
      bowlingScore.recordRoll(4);
      expect(bowlingScore.score).toEqual(9);
    });

    it('does not add to score if strike', function(){
      bowlingScore.recordRoll(10);
      expect(bowlingScore.score).toEqual(0);
    });

    it('calculates a strikes score after non strike bonus balls rolled', function(){
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(1);
      expect(bowlingScore.score).toEqual(14);
    });

    it('calculates a strikes score after 2nd strike rolled', function(){
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(1);
      expect(bowlingScore.score).toEqual(23);
    });

    it('calculates a strikes score after 3rd strike rolled', function(){
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      expect(bowlingScore.score).toEqual(30);
    });

    it('calculates a strikes score after 4th strike rolled', function(){
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      bowlingScore.recordRoll(10);
      expect(bowlingScore.score).toEqual(60);
    });

    it('does not add to score if spare', function(){
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(9);
      expect(bowlingScore.score).toEqual(0);
    });

    it('calculates a spare score after non strike bonus balls rolled', function(){
      bowlingScore.recordRoll(9);
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(1);
      bowlingScore.recordRoll(1);
      expect(bowlingScore.score).toEqual(13);
    });

  });

});