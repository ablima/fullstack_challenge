exports.paginate = (page, size) => {
  const offset = page * size;
  const limit = size;
    
  return {
    offset,
    limit,
  };
};