export const getFirstTwoWords = (name: string) => {
    const words = name.split(" "); 
    return words.slice(0, 2).join(" "); 
  };
 // Function to calculate age from date of birth in yyyymmdd format
 export const calculateAge = (dob: string): number => {
  if (typeof dob !== 'string') {
    console.error('Invalid date of birth format');
    return 0;
  }

  const year = parseInt(dob.substring(0, 4), 10);
  const month = parseInt(dob.substring(4, 6), 10) - 1; // JavaScript months are 0-indexed
  const day = parseInt(dob.substring(6, 8), 10);

  const birthDate = new Date(year, month, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};