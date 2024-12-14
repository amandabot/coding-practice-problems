# frozen_string_literal: true

# Calculates bonuses by looking ahead successive rolls.
class BowlingGame
  attr_accessor :rolls, :roll_multipliers, :frame_rolls, :frame_score, :frame_number

  def initialize
    @rolls = []

    @frame_rolls = 0
    @frame_score = 0
    @frame_number = 1
  end

  def roll(number_of_pins)
    rolls << number_of_pins
  end

  def score
    rolls.each_with_index.reduce(0) do |sum, (current_roll, index)|
      self.frame_score += current_roll
      self.frame_rolls += 1

      bonus = bonus(index)
      advance_frame if frame_complete?

      sum + current_roll + bonus
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

  def bonus(index)
    value = 0

    if knocked_over_all_pins? && !last_frame?
      value += roll_at_index(index + 1)
      value += roll_at_index(index + 2) if strike?
    end

    value
  end

  def roll_at_index(index)
    rolls[index] || 0
  end
end
