# Code

```ruby
require 'rspec/autorun'

# A game consists of 10 frames
# A player rolls 2 times per frame.
# The first roll is often referred to as the "top of the frame",
# and the second roll is often referred to as the "bottom of the frame"

class BowlingGame
  def initialize
  end

  def roll(number_of_pins)
  end

  def score
  end
end

RSpec.describe 'BowlingGame' do
  describe '.score' do
		it 'should score a 50 if I knock down 5 pins each frame!' do
		  game = BowlingGame.new
		  10.times do
		    game.roll(3)
		    game.roll(2)
		  end
		  expect(game.score).to eq 50
		end
		
		it 'should score a spare!' do
		  game = BowlingGame.new
		  game.roll(6)
		  game.roll(4)
		  game.roll(5)
		  game.roll(2)
		  expect(game.score).to eq 22
		end
		
		it 'should score a wonky spare' do
		  game = BowlingGame.new
		  game.roll(0)
		  game.roll(10)
		  game.roll(3)
		  game.roll(1)
		  expect(game.score).to eq 17
		end
		
		it 'should score a strike!' do
		  game = BowlingGame.new
		  game.roll(10)
		  game.roll(6)
		  game.roll(2)
		  expect(game.score).to eq 26
		end
		
		it 'should score a turkey' do
		  game = BowlingGame.new
		  game.roll(10)
		  game.roll(10)
		  game.roll(10)
		  game.roll(4)
		  game.roll(0)
		  expect(game.score).to eq 72
		end
		
		it 'should score a perfect game' do
		  game = BowlingGame.new
		  12.times do
		    game.roll(10)
		  end
		  expect(game.score).to eq 300
		end
		
		it 'should score a realistic game!' do
		  game = BowlingGame.new
		  4.times do
		    game.roll(5)
		    game.roll(2)
		  end
		  game.roll(10)
		  4.times do
		    game.roll(9)
		    game.roll(0)
		  end
		  game.roll(6)
		  game.roll(4)
		  game.roll(5)
		  expect(game.score).to eq 98
		end
  end
end
```

# Solutions

## Calculating score

### Track bonuses via roll number

- Store rolls in an array
- Create a bonus array for roll multipliers
    - Each value starts at 1
- If you determine that this roll N was a strike or spare, increment the multiplier for roll N+1, and if it was a strike, increment N+2 as well
- Calculate the score by looping over the rolls and summing the roll score times the multiplier at the same position (`score += roll[n] * bonus[n]`)

### Add bonuses with lookahead

- Store rolls in an array
- Loop over the array
    - When a strike or spare is detected, look ahead 1-2 rolls and add those to the score

### Frames which manage their own rolls and score

- Create a Frame class which can store an array of rolls
    - The class can calculate its base score based on the sum of rolls
    - The class needs a method which can look at future frames to get rolls for bonuses
        - At most, only need next 2 frames, so we could get a combined array of their rolls and take the first 1-2 rolls from them
- Loop over the instances and sum their individual scores

### Frame class which tracks its indices within an array of rolls

- Store rolls in an array
- Create a Frame class which stores the start and end index of rolls that belong to it (e.g. `start = 0; end = 2`)
    - The class can calculate its base score based on the sum of the rolls in that index range
    - Bonuses are calculated based on whether the frame score is a strike or spare
    - The Frame class can look ahead in the roll array to get bonus rolls

## Tracking Frames

- We need to track the frame score and number of rolls which have passed
    - The frame score is the number of pins hit so far
    - The number of rolls refers to how many rolls are in the frame, not the total number of rolls
    - If we have a Frame class tracking its own rolls, we could use it to calculate something like `frame.completed?` instead of tracking a frame score and rolls during the scoring process
- Frame completion requirements
    - Frames 1-9 are completed when:
        - Roll count is 2 or frame score is 10
    - Frame 10 is completed when:
        - Roll count is 2 and frame score is less than 10
        - Roll count is 3
- Basic algorithm (no Frame class)
    - Add current points to frame score
    - If frame was completed
        - Reset frame score
        - Reset roll count
    - Otherwise
        - Increment roll count
- Frame class algorithm (class has a `completed?` method)
    - Add roll to current frame
    - If `frame.completed?` and this is not frame 10
        - Add new frame and set current frame to this one