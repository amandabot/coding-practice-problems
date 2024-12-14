# frozen_string_literal: true

# Calculates bonuses using a roll multiplier array. Certain rolls are incremented so they count
# multiple times - as a roll and as a bonus - based on whether a strike, spare, or incomplete
# frame was rolled.
class BowlingGame
  attr_accessor :rolls, :roll_multipliers, :frame_rolls, :frame_score, :frame_number

  def initialize
    @rolls = []
    @roll_multipliers = Array.new(21) { 1 }

    @frame_rolls = 0
    @frame_score = 0
    @frame_number = 1
    @roll_index = 0
  end

  def roll(number_of_pins)
    rolls << number_of_pins

    self.frame_score += number_of_pins
    self.frame_rolls += 1

    apply_bonuses if !last_frame? && knocked_over_all_pins?
    advance_frame if frame_complete?
  end

  def score
    rolls.each_with_index.reduce(0) do |sum, (current_roll, index)|
      sum + (current_roll * roll_multipliers[index])
    end
  end

  private

  def frame_complete?
    if last_frame?
      last_frame_complete?
    else
      knocked_over_all_pins? || exhausted_rolls?
    end
  end

  def last_frame?
    frame_number == 10
  end

  def last_frame_complete?
    last_frame? && (frame_rolls == 3 || (exhausted_rolls? && frame_score < 10))
  end

  def knocked_over_all_pins?
    frame_score == 10
  end

  def exhausted_rolls?
    frame_rolls == 2
  end

  def strike?
    knocked_over_all_pins? && frame_rolls == 1
  end

  def advance_frame
    self.frame_score = 0
    self.frame_rolls = 0
    self.frame_number += 1
  end

  def apply_bonuses
    index = rolls.length - 1

    roll_multipliers[index + 1] += 1
    roll_multipliers[index + 2] += 1 if strike?
  end
end
