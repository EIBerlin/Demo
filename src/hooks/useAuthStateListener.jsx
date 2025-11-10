import { useEffect } from "react";

const useAuthStateListener = (setUser) => {
  useEffect(() => {
    const readUser = () => {
      try {
        const raw = localStorage.getItem('authUser');
        if (!raw) {
          setUser(null);
          return;
        }
        const user = JSON.parse(raw);
        setUser(user);
      } catch (err) {
        console.warn('Failed to parse authUser from localStorage', err);
        setUser(null);
      }
    };

    readUser();

    const onStorage = (e) => {
      if (e.key === 'authUser' || e.key === 'token') readUser();
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [setUser]);
};

export default useAuthStateListener;
