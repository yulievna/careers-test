import React, { useState } from 'react';
import s from './SidebarInquiryForm.module.css';

interface FormData {
  name: string;
  email: string;
  resume: File | null;
  message: string;
  agreement: boolean;
}

const SidebarInquiryForm: React.FC = () => {
  const [resumeName, setResumeName] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    resume: null,
    message: '',
    agreement: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setResumeName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreement) {
      alert('Необходимо согласиться на обработку персональных данных');
      return;
    }

    if (!formData.name || !formData.email) {
      alert('Заполните обязательные поля: имя и email');
      return;
    }

    setIsSubmit(true);

    setTimeout(() => {
      setIsSubmit(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      setFormData({
        name: '',
        email: '',
        resume: null,
        message: '',
        agreement: false,
      });
      setResumeName('Прикрепить резюме');
    }, 1000);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.form__info}>
        <p className={s.form__title}>Не нашли подходящей вакансии?</p>
        <p className={s.form__text}>
          Оставьте Ваши контактные данные и резюме, мы свяжемся с Вами как только появится
          подходящая вакансия для вас!
        </p>
      </div>

      <input
        type="text"
        placeholder="Ваше имя"
        className={s.form__input}
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
      />

      <input
        type="email"
        placeholder="Ваша почта"
        className={s.form__input}
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
      />

      <div className={s.form__fileWrapper}>
        <input type="file" id="resume" className={s.form__fileInput} onChange={handleFileChange} />
        <label htmlFor="resume" className={s.form__fileLabel}>
          <span>{resumeName || 'Прикрепить резюме'}</span>
          <img src="/assets/images/document-text.svg" alt="Document icon" />
        </label>
      </div>

      <textarea
        placeholder="Сопроводительное письмо"
        className={s.form__textarea}
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      />

      <div className={s.form__checkbox}>
        <label htmlFor="agreement" className={s.form__checkboxLabel}>
          <input
            type="checkbox"
            id="agreement"
            className={s.form__checkboxInput}
            checked={formData.agreement}
            onChange={(e) => setFormData((prev) => ({ ...prev, agreement: e.target.checked }))}
          />
          <span className={s.form__checkboxCustom}></span>
          <span className={s.form__checkboxText}>
            Согласен(а) на обработку персональных данных в соответствии с&nbsp;
            <a href="/privacy-policy">Политикой конфиденциальности</a>
          </span>
        </label>
      </div>

      <button type="submit" className={s.form__btn} disabled={isSubmit}>
        {isSubmit ? 'Отправляется...' : 'Отправить'}
      </button>
      {showToast && <div className={s.toast}>Заявка отправлена</div>}
    </form>
  );
};

export default SidebarInquiryForm;
