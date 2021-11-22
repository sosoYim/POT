const formatRegDate = regDate => {
  const [date, time] = regDate.split(' ');
  const [year, month, day] = date.split('-');
  const today = new Date();

  return today.getFullYear() === +year && today.getMonth() + 1 === +month && today.getDate() === +day ? time : date;
};

const getLastPath = url => url.substring(url.lastIndexOf('/') + 1);

export { formatRegDate, getLastPath };
