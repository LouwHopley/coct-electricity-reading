/**
 * @param {string} stringInput - The number string to be cleaned
 * @returns {number} - The cleaned number
 * @description Removes any characters that are not numbers, decimal points or commas and converts the string to a number
 */
export const cleanNumber = (stringInput) => {
  // Remove any characters that are not numbers, decimal points or commas
  const stringNumber = stringInput.replace(/[^0-9.,]/g, '');
  let cleanedNumber = stringNumber.replace(/,/g, '.');
  // Check if there is more than one decimal point
  if (cleanedNumber.split('.').length > 2)
    cleanedNumber = stringNumber.replace(/,/g, '');
  // Convert the string to a number
  const number = parseFloat(cleanedNumber);
  return number;
};
