/** Textual markov chain generator. */

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let chain = {};

    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!(currWord in chain)) {
        chain[currWord] = [nextWord];
      } else {
        chain[currWord].push(nextWord);
      }
    }

    return chain;
  }

  getRandomWord(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    let firstWord = this.words[0];
    let resultStr = firstWord;

    let nextWord = this.getRandomWord(this.chains[firstWord]);
    while (nextWord !== null) {
      resultStr += ` ${nextWord}`;
      nextWord = this.getRandomWord(this.chains[nextWord]);
    }
    return resultStr;
  }
}

module.exports = {
  MarkovMachine,
};
