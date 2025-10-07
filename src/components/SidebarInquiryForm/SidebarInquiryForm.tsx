import React, { Component } from 'react';
import s from './SidebarInquiryForm.module.css';

interface SidebarInquiryFormState {
    resumeName: string;
}

class SidebarInquiryForm extends Component<{}, SidebarInquiryFormState> {
    state: SidebarInquiryFormState = { resumeName: '' };

    handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            this.setState({ resumeName: file.name });
        }
    };


    render() {
        return (
            <form className={s.form}>
                <div className={s.form__info}>
                    <p className={s.form__title}>Не нашли подходящей вакансии?</p>
                    <p className={s.form__text}>
                        Оставьте Ваши контактные данные и резюме,
                        мы свяжемся с Вами как только появится 
                        подходящая вакансия для вас! 
                    </p>
                </div>

                <input 
                    type="text" 
                    placeholder='Ваше имя'
                    className={s.form__input}
                />

                <input 
                    type="email" 
                    placeholder='Ваша почта'
                    className={s.form__input}
                />

                <div className={s.form__fileWrapper}>
                    <input 
                        type="file"
                        id="resume"
                        className={s.form__fileInput}
                        onChange={this.handleFileChange}
                    />
                    <label htmlFor="resume" className={s.form__fileLabel}>
                        <span>{this.state.resumeName || 'Прикрепить резюме'}</span>
                        <img src="/assets/images/document-text.svg" alt="Document icon" />
                    </label>
                </div>

                <textarea 
                    placeholder='Сопроводительное письмо'
                    className={s.form__textarea} 
                />
               <div className={s.form__checkbox}>
                    <label htmlFor="agreement" className={s.form__checkboxLabel}>
                        <input 
                            type="checkbox" 
                            id="agreement" 
                            className={s.form__checkboxInput}
                        />
                        <span className={s.form__checkboxCustom}></span>
                        <span className={s.form__checkboxText}>
                            Согласен(а) на обработку персональных данных в соответствии с&nbsp;
                            <a href="/privacy-policy">Политикой конфиденциальности</a>
                        </span>
                    </label>
                </div>



                <button type="submit" className={s.form__btn}>
                    Отправить
                </button>
            </form>
        );
    }
}

export default SidebarInquiryForm;
