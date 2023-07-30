const getStorageByType = (data, types) => {
  const totalSizesByType = {};

  const filteredData = data.filter((item) => types.includes(item.type));

  filteredData.forEach((element) => {
    if (!totalSizesByType[element.type]) {
      totalSizesByType[element.type] = 0;
    }
    totalSizesByType[element.type] += element.size;
  });

  Object.keys(totalSizesByType).forEach((type) => {
    console.log(
      `${type}: ${(totalSizesByType[type] / 1024 ** 2).toFixed(2)} MB`
    );
  });

  return totalSizesByType;
};

export default {
  getStorageByType,
};
