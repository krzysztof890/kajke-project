declare global {
  interface Array<T> {
    /**
     * Zwroci ostatni element tablicy
     */
    last(): T;
  }
}

Array.prototype.last = function () {
  return this[this.length - 1];
};

export { };
