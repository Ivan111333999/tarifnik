'use strict';

import menu from './modules/menu.js';
import {Card} from './modules/cards.js';

menu('.header-navbar__menu-item');

// Форма
const postData = async (url, data) => { // внутри будет асинхронный код
    const res = await fetch(url, { // дожидаемся результат запроса
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json(); // дожидаемся метода json, только после этого возвращаем значение функции
}

const form = document.querySelector('form');
const message = {
    loading: 'Данные отправляются на сервер, подождите..',
    success: 'Ваши данные получены - дождитесь ответа.',
    failure: 'Данные до нас не дошли, пожалуйста, повторите попытку..'
  };
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const notice = document.createElement('div'); // блок с уведомлением пользователя
        notice.textContent = message.loading;
        form.append(notice);
        
        const dataForm = new FormData(form), // Забираем данные с формы
          object = {};
          dataForm.forEach((item, i) => { // из экземляра FormData перезаписываем в json
            object[i] = item;
        });

        postData('http://localhost:3000/requestForm', JSON.stringify(object))
        .then(data => {
            console.log(data);
            console.log('Запрос выполнен корректно', data);
            notice.textContent = message.success;
        }).catch((err) => {  // Предыдущий промис отображаем в консоль
            console.log(err);
            notice.textContent = message.failure;
        }).finally(() => {
            form.reset();
            setTimeout(() => {
                notice.remove();
            }, 2000);
        });
    });

// Карточки товаров