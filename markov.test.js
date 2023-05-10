"use strict";

const { MarkovMachine } = require("./markov");

describe("markov tests", function () {

  test("get chains", function() {
    let markMachine = new MarkovMachine("the cat in the hat");

    expect(markMachine.chains).toEqual({
      the: [ 'cat', 'hat' ],
      cat: [ 'in' ],
      in: [ 'the' ],
      hat: [ null ]
    });
  });
});