export function numberRange(num) {
    if (num <= 0) {
      return [];
    }
    
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(i);
    }
    return result;
  }