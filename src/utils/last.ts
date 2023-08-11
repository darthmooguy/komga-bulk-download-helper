export default function last(array: any[]) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : undefined;
}
