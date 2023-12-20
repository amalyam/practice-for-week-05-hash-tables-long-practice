class KeyValuePair {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    // 1. should add a `KeyValuePair` to its table of `data`
    // 2. should handle collisions with linked lists if different keys and
    // `hashMod()` outputs arrive at the same bucket index
    // 3. should handle already inserted `KeyValuePair` value updates.
    // If the same key is inserted but the value is different,
    // the old value must be replaced with the new value.
    const LOAD_FACTOR = 0.7;
    if (this.count / this.capacity > LOAD_FACTOR) {
      this.resize();
    }

    const index = this.hashMod(key);
    let current = this.data[index];

    while (current && current.key !== key) {
      current = current.next;
    }

    if (current) {
      current.value = value;
      return;
    } else {
      const keyValuePair = new KeyValuePair(key, value);
      keyValuePair.next = this.data[index];
      this.data[index] = keyValuePair;
      this.count++;
    }
  }

  read(key) {
    let node = this.data[this.hashMod(key)];

    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
    return undefined;
  }

  resize() {
    // 1. `data`'s elements must be preserved in a copy for redistribution.
    // 2. `capacity` should now be double its previous value.
    // 3. `data` should now be a new `Array` scaling to the new `capacity`.
    // 4. Redistribute all of the elements in your copy of `data` back into the
    // `HashTable` while making sure to check for any nodes nested in linked lists.
    const copiedData = this.data;
    let copiedCount = this.count;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);

    for (let i = 0; i < copiedData.length; i++) {
      let node = copiedData[i];
      while (node) {
        this.insert(node.key, node.value);
        node = node.next;
      }
      this.count = copiedCount;
    }
  }

  delete(key) {
    const index = this.hashMod(key);
    const itemToDelete = this.data[index];

    if (!itemToDelete) {
      return "Key not found";
    } else {
      let remaining = itemToDelete.next;
      itemToDelete.value = null;
      itemToDelete.next = null;
      if (itemToDelete.next) {
        this.insert(remaining);
      }
    }
  }
}

module.exports = HashTable;
