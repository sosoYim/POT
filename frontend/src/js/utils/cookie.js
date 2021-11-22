const getSummoner = () => decodeURI(document.cookie.replace(/(?:(?:^|.*;\s*)summoner\s*=\s*([^;]*).*$)|^.*$/, '$1'));

export { getSummoner };
