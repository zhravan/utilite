# Array Utilities - Interactive Examples

This page demonstrates the Array utility functions from utilite with live, interactive examples.

## isAnyMatching

Checks if any element in the array matches the given predicate function.

```demo:javascript
/* @desc Check if any number in the array is even */
// Import would be: import { isAnyMatching } from 'utilite';

// Inline implementation for demo
function isAnyMatching(array = [], mapper) {
  return array
    .map(mapper)
    .filter(Boolean)
    .reduce((a, b) => a ?? b, false);
}

const numbers = [1, 3, 5, 7, 8, 9];
const hasEven = isAnyMatching(numbers, (n) => n % 2 === 0);

console.log('Numbers:', numbers);
console.log('Has even number:', hasEven);

const fruits = ['apple', 'banana', 'cherry'];
const hasLongName = isAnyMatching(fruits, (f) => f.length > 6);
console.log('Fruits:', fruits);
console.log('Has fruit with name longer than 6:', hasLongName);
```

## filterFalsy

Filters out falsy values from an array.

```demo:javascript
/* @desc Remove all falsy values from an array */
function filterFalsy(array) {
  return array.filter((item) => item);
}

const mixedArray = [0, 1, false, true, '', 'hello', null, 'world', undefined, 42];
const truthyOnly = filterFalsy(mixedArray);

console.log('Original array:', mixedArray);
console.log('After filtering falsy:', truthyOnly);
```

## getUniqueElements

Returns an array with only unique elements.

```demo:javascript
/* @desc Get unique elements from an array */
function getUniqueElements(array) {
  return Array.from(new Set(array));
}

const numbers = [1, 2, 2, 3, 4, 4, 4, 5, 1, 2];
const unique = getUniqueElements(numbers);

console.log('Original array:', numbers);
console.log('Unique elements:', unique);

const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'date'];
const uniqueWords = getUniqueElements(words);
console.log('Original words:', words);
console.log('Unique words:', uniqueWords);
```

## union

Returns the union of two arrays (all unique elements from both).

```demo:javascript
/* @desc Get the union of two arrays */
function union(a1, a2) {
  return Array.from(new Set([...a1, ...a2]));
}

const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const result = union(array1, array2);

console.log('Array 1:', array1);
console.log('Array 2:', array2);
console.log('Union:', result);
```

## intersection

Returns the intersection of two arrays (elements present in both).

```demo:javascript
/* @desc Get the intersection of two arrays */
function intersection(a1, a2) {
  return a1.filter((item) => a2.includes(item));
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);

console.log('Array 1:', array1);
console.log('Array 2:', array2);
console.log('Intersection:', result);

const tech1 = ['JavaScript', 'TypeScript', 'Python', 'Java'];
const tech2 = ['Python', 'Ruby', 'JavaScript', 'Go'];
const commonTech = intersection(tech1, tech2);
console.log('Common technologies:', commonTech);
```

## difference

Returns the difference of two arrays (elements in first but not in second).

```demo:javascript
/* @desc Get the difference of two arrays */
function difference(a1, a2) {
  return a1.filter((item) => !a2.includes(item));
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = difference(array1, array2);

console.log('Array 1:', array1);
console.log('Array 2:', array2);
console.log('Difference (A - B):', result);
```

## getHeadN

Gets the first N elements from an array.

```demo:javascript
/* @desc Get the first N elements */
function getHeadN(array, limit = 0) {
  return array.slice(0, limit);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Original array:', numbers);
console.log('First 3 elements:', getHeadN(numbers, 3));
console.log('First 5 elements:', getHeadN(numbers, 5));
```

## getTailN

Gets the last N elements from an array.

```demo:javascript
/* @desc Get the last N elements */
function getTailN(array, limit = 0) {
  return limit <= 0 ? [] : array.slice(-limit);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Original array:', numbers);
console.log('Last 3 elements:', getTailN(numbers, 3));
console.log('Last 5 elements:', getTailN(numbers, 5));
```

## fillArray

Creates an array of specified length filled with a value.

```demo:javascript
/* @desc Create a filled array */
function fillArray(length, value) {
  return Array(length).fill(value);
}

const zeros = fillArray(5, 0);
const stars = fillArray(10, '⭐');
const objects = fillArray(3, { status: 'pending' });

console.log('Array of 5 zeros:', zeros);
console.log('Array of 10 stars:', stars);
console.log('Array of 3 objects:', objects);
```

## Try It Yourself!

Click the "Try in JSFiddle" button on any example above to:
- Modify the code
- Experiment with different values
- See results in real-time
- Share your modifications

## Installation

To use these utilities in your project:

```bash
npm install utilite
```

```javascript
import { 
  isAnyMatching, 
  filterFalsy, 
  getUniqueElements,
  union,
  intersection,
  difference
} from 'utilite';
```
