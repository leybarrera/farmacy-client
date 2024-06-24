const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getData = (key) => {
  const storage = localStorage.getItem(key);
  return storage ? JSON.parse(storage) : null;
};

const deleteData = (key) => {
  localStorage.removeItem(key);
  return true;
};

export default { saveData, getData, deleteData };
