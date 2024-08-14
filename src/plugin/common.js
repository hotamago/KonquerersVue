
function timestamp2date(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

async function l(text){
  // Kiem tra text ton tai trong database
  // Neu khong ton tai thi them vao database
  // Neu ton tai thi tra ve text da dich
  // Dich text sang tieng Viet
  return text;
}

// Convert strict structure to right structure
function genType(type, fnc) {
  let typeAllowed = ["dict", "list", "var"];
  if (typeAllowed.includes(type)) {
    return { f: fnc, type: type };
  } else {
    console.error("Invalid type");
  }
}
function genReDefault(data, defaultValue){
  if(data === undefined){
    return defaultValue;
  }
  if(typeof data != typeof defaultValue){
    throw new Error("Error non same type: ", data, defaultValue);
  }
  return data;
}
function followStructStrict(struct, data) {
  // Check if data is undefined
  if (data === undefined) {
    if (struct.type == "dict") {
      let dataNew = {};
      // Loop through the struct and create a new object
      for (const key in struct.f) {
        // Check if the struct has a type
        if (struct.f[key].type != undefined) {
          // If the struct has a type, call followStructStrict recursively
          dataNew[key] = followStructStrict(struct.f[key], undefined);
        } else {
          // If the struct does not have a type, call the function
          dataNew[key] = struct.f[key](undefined);
        }
      }
      return dataNew;
    } else if (struct.type == "list") {
      return [];
    } else if (struct.type == "var") {
      return struct.f(undefined);
    }
  }
  // If data is not undefined
  // Check if same typeof
  if (Array.isArray(data) && struct.type != "list") {
    throw new Error("Error non same type: ", data, struct.type);
  } else if (!Array.isArray(data) && typeof data == "object" && struct.type != "dict") {
    throw new Error("Error non same type: ", data, struct.type);
  } else if (typeof data == "object" && struct.type == "var") {
    throw new Error("Error non same type: ", data, struct.type);
  } else if (typeof data != "object" && struct.type == "dict") {
    throw new Error("Error non same type: ", data, struct.type);
  }
  // Check case
  if (struct.type == "dict") {
    let dataNew = {};
    for (const key in struct.f) {
      if (struct.f[key].type != undefined) {
        dataNew[key] = followStructStrict(struct.f[key], data[key]);
      } else {
        dataNew[key] = struct.f[key](data[key]);
      }
    }
    return dataNew;
  } else if (struct.type == "list") {
    let dataNew = [];
    // Loop through the data and call followStructStrict recursively
    for (const key in data) {
      if (struct.f.type != undefined) {
        dataNew.push(followStructStrict(struct.f, data[key]));
      } else {
        dataNew.push(struct.f(data[key]));
      }
    }
    return dataNew;
  } else {
    return struct.f(data);
  }
}

// Convert to right structure
function followStruct(data, struct) {
  // data and struct are objects
  for (const key in struct) {
    if (data[key] === undefined) {
      data[key] = struct[key];
    } else if (typeof struct[key] === "object") {
      data[key] = followStruct(data[key], struct[key]);
    }
  }

  return data;
}

export { timestamp2date, l, followStruct, followStructStrict };