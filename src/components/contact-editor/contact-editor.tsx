import { Contact } from '../../models/contact';
import { logOut, selectToken } from '../../state/authSlice';
import {
  editContact,
  createContact,
  deleteContact,
} from '../../state/contactsSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import ContactForm from '../forms/contact-form/contact-form';
import styles from './contact-editor.module.css';

type Props = {
  contact?: Contact;
  onCancel: Function;
};

const ContactEditor: React.FC<Props> = ({ contact, onCancel }) => {
  const accessToken = useAppSelector(selectToken) as string;
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Contact) => {
    if (contact) {
      const result = await dispatch(
        editContact({ contact: data, accessToken })
      );

      if (editContact.fulfilled.match(result)) {
        onCancel();
      } else {
        alert('Не удалось отредактировать контакт');
        dispatch(logOut());
      }
    } else {
      const result = await dispatch(
        createContact({ contact: data, accessToken })
      );

      if (createContact.fulfilled.match(result)) {
        onCancel();
      } else {
        alert('Не удалось создать контакт');
        dispatch(logOut());
      }
    }
  };

  const onDelete = async (id: number) => {
    const result = await dispatch(deleteContact({ id, accessToken }));

    if (deleteContact.fulfilled.match(result)) {
      onCancel();
    } else {
      alert('Не удалось удалить контакт');
      dispatch(logOut());
    }
  };

  return (
    <div className={styles.editor_container}>
      <header className={styles.header}>
        <h4 className={styles.header__title}>
          {contact ? `Редактирование контакта` : 'Добавление контакта'}
        </h4>
      </header>
      <ContactForm
        contact={contact}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactEditor;
