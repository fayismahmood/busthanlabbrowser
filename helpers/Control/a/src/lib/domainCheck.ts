export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function isValidDomain(str: string) {
  // Regex to check valid
  // Domain Name
  let regex = new RegExp(
    /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
  );

  // if str
  // is empty return false
  if (str == null) {
    return false;
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
}

export function processSearchBar(str: string) {
  if (isValidUrl(str)) {
    return str;
  } else {
    if (isValidDomain(str)) {
        return `http://${str}`
    }else{
        return `https://www.google.com/search?q=${str}`
    }
  }
}
