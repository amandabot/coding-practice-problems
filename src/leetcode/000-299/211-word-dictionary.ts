class WordDictionary {
    rootNode: TrieNode;
    private letterIndexOffset = 'a'.charCodeAt(0);

    constructor() {
        this.rootNode = new TrieNode('');
    }

    addWord(word: string): void {
        let previousNode = this.rootNode;
        for (let index = 0; index < word.length; index++) {
            const letter = word[index];
            const letterIndex = this.letterToIndex(letter);

            let matchingNode = previousNode.nodes[letterIndex];
            if (!matchingNode) {
                matchingNode = new TrieNode(letter);
                previousNode.nodes[letterIndex] = matchingNode;
            }
            previousNode = matchingNode;
        }

        previousNode.isEndNode = true;
    }

    search(word: string, startIndex = 0, startingNode?: TrieNode): boolean {
        let previousNode = startingNode ?? this.rootNode;

        for (let index = startIndex; index < word.length; index++) {
            const letter = word[index];
            if (letter === '.') {
                return previousNode.nodes.some(node => {
                    return !!(node) && this.search(word, index + 1, node);
                });
            }
            else {
                let matchingNode = this.getMatchingChildNode(letter, previousNode);
                if (matchingNode?.letter !== letter) {
                    return false;
                }
                previousNode = matchingNode;
            }
        }

        return previousNode.isEndNode;
    }

    private getMatchingChildNode(letter: string, parentNode: TrieNode): TrieNode {
        const letterIndex = this.letterToIndex(letter);

        return parentNode.nodes[letterIndex];
    }

    private letterToIndex(letter: string): number {
        const letterCode = letter.charCodeAt(0);
        return letterCode - this.letterIndexOffset;
    }
}

class TrieNode {
    letter: string;
    isEndNode: boolean;
    nodes: Array<TrieNode>;

    constructor(letter: string) {
        this.isEndNode = false;
        this.letter = letter;
        this.nodes = [];
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

export function runTests(): void {
    const wordDictionary = new WordDictionary();

    // wordDictionary.addWord('bad');
    // wordDictionary.addWord('dad');
    // wordDictionary.addWord('mad');

    // console.log(wordDictionary.search('pad')); // return False
    // console.log(wordDictionary.search('bad')); // return True
    // console.log(wordDictionary.search('.ad')); // return True
    // console.log(wordDictionary.search('b..')); // return True
    // console.log(wordDictionary.search('b.d.')); // return false

    wordDictionary.addWord('a');
    wordDictionary.addWord('a');
    console.log(wordDictionary.search('.')); // return true
    console.log(wordDictionary.search('a')); // return true
    console.log(wordDictionary.search('aa')); // return False
    console.log(wordDictionary.search('a')); // return true
    console.log(wordDictionary.search('.a')); // return False
    console.log(wordDictionary.search('a.')); // return False
}
