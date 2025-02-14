export const getFirstTwoWords = (name: string) => {
    const words = name.split(" "); 
    return words.slice(0, 2).join(" "); 
  };
  