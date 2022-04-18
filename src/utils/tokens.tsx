export const saveToken = (token: string) => {
  let expires = '';
  const days = 7;
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  expires = '; expires=' + date.toUTCString();

  document.cookie =
    encodeURIComponent('token') + '=' + encodeURIComponent(token) + expires + '; path=/';
};

export const getToken = () => {
  const keyValue = document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

export const removeToken = () => {
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
