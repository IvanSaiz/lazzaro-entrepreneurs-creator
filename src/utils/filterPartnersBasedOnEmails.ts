function filterPartnersBasedOnEmails(arr: any) {
  const emailMap = {};
  const result = [];

  // Iterate over each object in the array
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    const email = obj.User?.email;

    // If the email doesn't exist in the map, add it
    if (!emailMap[email]) {
      emailMap[email] = true;
      result.push(obj);
    }
  }

  return result;
}

export default filterPartnersBasedOnEmails;
