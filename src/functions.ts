export const getFirstTwoWords = (name: string) => {
    const words = name.split(" "); 
    return words.slice(0, 2).join(" "); 
  };
  
  export const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "N/A";
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
