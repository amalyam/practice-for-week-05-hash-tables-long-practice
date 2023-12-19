class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets);
    this.data.fill(null, 0);
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
    const keyVal = new KeyValuePair(key, value);
    const index = this.hashMod(key);
    let overwrite = false;

    if (!this.data[index]) {
      this.data[index] = keyVal;
    } else {
      if (this.data[index]?.next) {
        let current = this.data[index];
        while (current) {
          if (current.key === keyVal.key) {
            current.value = keyVal.value;
            this.count--;
            overwrite = true;
          }
          current = current.next;
        }
      }
      if (!overwrite) {
        keyVal.next = this.data[index];
        this.data[index] = keyVal;
      }
    }
    this.count++;
  }

  read(key) {
    let current = this.data[this.hashMod(key)];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
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

    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity);
    this.data.fill(null, 0);
    this.count = 0;

    for (let i = 0; i < copiedData.length; i++) {
      if (copiedData[i].next) {
        let current = copiedData[i];
        while (current) {
          this.insert(current.key, current.value);
          current = current.next;
        }
      } else {
        this.insert(copiedData[i].key, copiedData[i].value);
      }
    }
  }

  delete(key) {
    // Your code here
  }
}

module.exports = HashTable;
