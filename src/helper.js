export function checkHeading(str) {
    return /^\*\*(.*)\*$/.test(str);
  }
  export function replaceHeading(str) {
    const regex = /^\*\*(.*)\*$/;
    return str.replace(regex, '$1');
  }