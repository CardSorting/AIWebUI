/**
 * On FireFox, text cannot be justified while also enabling `white-space: pre-wrap` in order to preserve
 * user-input double spaces and new lines. To work around this bug, we use `white-space: pre-line` and replace all double
 * spaces with a regular space followed by a non breaking space
 */
const keepDoubleSpaces = (text: string) => text.replaceAll('  ', ' &nbsp;');

export default keepDoubleSpaces;
