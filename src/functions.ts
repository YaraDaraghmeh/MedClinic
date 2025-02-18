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
  export const calculateStars = (rating: number): number => {
    return parseFloat(((rating / 10) * 5).toFixed(1));
  };

export const generatePassword = () => {
  const length = 10; // Password length
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    
  });
};
