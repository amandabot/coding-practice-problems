class Trie {
    rootNode: TrieNode;
    private letterIndexOffset = 'a'.charCodeAt(0);

    constructor() {
        this.rootNode = new TrieNode('');
    }

    insert(word: string): void {
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

    search(word: string): boolean {
        let previousNode = this.rootNode;
        let containsWord = true;
        for (let index = 0; index < word.length; index++) {
            const letter = word[index];
            const letterIndex = this.letterToIndex(letter);

            let matchingNode = previousNode.nodes[letterIndex];
            if (matchingNode?.letter !== letter) {
                containsWord = false;
                break;
            }
            previousNode = matchingNode;
        }

        return containsWord && previousNode.isEndNode;
    }

    startsWith(prefix: string): boolean {
        let previousNode = this.rootNode;
        let containsWord = true;
        for (let index = 0; index < prefix.length; index++) {
            const letter = prefix[index];
            const letterIndex = this.letterToIndex(letter);

            let matchingNode = previousNode.nodes[letterIndex];
            if (matchingNode?.letter !== letter) {
                containsWord = false;
                break;
            }
            previousNode = matchingNode;
        }

        return containsWord;
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
    const trie = new Trie();

    trie.insert('apple');
    console.log(trie.search('apple'));   // returns true
    console.log(trie.search('app'));     // returns false
    console.log(trie.startsWith('app')); // returns true

    trie.insert('app');
    console.log(trie.search('app'));     // returns true
}
