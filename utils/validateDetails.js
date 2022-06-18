const validateDetails = (address, phone) => {
  if (address.length === 0) return "Enter a valid Address!.";

  if (address.length < 10)
    return "Address is too short, please enter a well descriptive address!";

  if (phone.length < 11) return "You have enered an invalid phone number!.";
};

export default validateDetails;
