export const auth = (from,to,next) => {
  const token = localStorage.getItem('authorization');
  if (token) {
    next();
  }else{
    next({
      path:'/login'
    });
  }
};

