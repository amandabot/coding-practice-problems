# frozen_string_literal: true

require 'rspec/autorun'
# require_relative 'bowling_roll_multiplier'
# require_relative 'bowling_roll_lookahead'
require_relative 'bowling_frame_lookahead'

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
