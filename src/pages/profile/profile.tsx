import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  if (!user) return null;

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    Boolean(formValue.password);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined
      })
    ).then(() => {
      setFormValue((prev) => ({
        ...prev,
        password: ''
      }));
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      updateUserError={error || undefined}
    />
  );
};
