# frozen_string_literal: true

# Uses a Frame class to calculate score and bonuses, and to determine when the frame is completed.
class BowlingGame
  attr_accessor :frames, :frame_number, :current_frame

  def initialize
    @frame_number = 1
    @current_frame = Frame.new(frame_number)
    @frames = [current_frame]
  end

  def roll(number_of_pins)
    current_frame.add_roll(number_of_pins)

    advance_frame if current_frame.completed? && !game_completed?
  end

  def score
    frames.reduce(0) do |sum, frame|
      sum + frame.score + frame_bonus(frame)
    end
  end

  private

  def frame_bonus(frame)
    value = 0

    if frame.knocked_over_all_pins? && frame.number != 10
      # concat accounts for missing frames and ensures there are always 2 values in the array
      bonus_rolls = frames
        .slice(frame.number, 2)
        .flat_map(&:rolls)
        .concat([0, 0])

      value += bonus_rolls[0]
      value += bonus_rolls[1] if frame.strike?
    end

    value
  end

  def game_completed?
    frame_number == 10
  end

  def advance_frame
    self.frame_number += 1
    self.current_frame = Frame.new(frame_number)
    frames << current_frame
  end
end

# Frame class
class Frame
  attr_accessor :rolls, :number

  def initialize(number)
    @number = number
    @rolls = []
  end

  def add_roll(number_of_pins)
    rolls << number_of_pins
  end

  def score
    rolls.sum
  end

  def strike?
    knocked_over_all_pins? && rolls.length == 1
  end

  def completed?
    if last_frame?
      last_frame_complete?
    else
      knocked_over_all_pins? || exhausted_rolls?
    end
  end

  def knocked_over_all_pins?
    score == 10
  end

  private

  def exhausted_rolls?
    rolls.length == 2
  end

  def last_frame?
    number == 10
  end

  def last_frame_complete?
    last_frame? && (rolls.length == 3 || (exhausted_rolls? && score < 10))
  end
end
