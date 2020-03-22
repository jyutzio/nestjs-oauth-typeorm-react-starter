import { useState, useEffect } from 'react';
import { UserDto } from '../../backend/user/user.dto';

export function useProfile(): [UserDto | null, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserDto | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/user', {
      mode: 'cors',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setProfile(json);
      });
    setIsLoading(false);
  }, []);

  return [profile, isLoading];
}
