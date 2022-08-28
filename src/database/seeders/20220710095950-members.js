'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Member', [
      {
        "name": "Бекзат",
        "surname": "Акматов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Марина",
        "surname": "Аксенова",
        "sex": "female",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Глеб",
        "surname": "Бажанов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Вадим",
        "surname": "Бакланов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Андрей",
        "surname": "Буркин",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Игорь",
        "surname": "Евграфов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Богдан",
        "surname": "Кабанов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Валерия",
        "surname": "Кирина",
        "sex": "female",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Павел",
        "surname": "Климов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Артём",
        "surname": "Котов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Никита",
        "surname": "Лавренюк",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Артём",
        "surname": "Лытков",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Анатолий",
        "surname": "Нагорский",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Дмитрий",
        "surname": "Никулин",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Самар",
        "surname": "Пайзов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Константин",
        "surname": "Пупенчиков",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Дамир",
        "surname": "Рахимов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Дмитрий",
        "surname": "Спиридонов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Яна",
        "surname": "Странина",
        "sex": "female",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Алексей",
        "surname": "Тамаров",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Илья",
        "surname": "Телегин",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Анатолий",
        "surname": "Тямусов",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Артём",
        "surname": "Янин",
        "sex": "male",
        "plat": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },

      
      {
        "name": "Турал",
        "surname": "Алиев",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Дитман",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Ксения",
        "surname": "Караблина",
        "sex": "female",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Милана",
        "surname": "Каргаева",
        "sex": "female",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Артём",
        "surname": "Ковалёв",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Илья",
        "surname": "Королёв",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Егор",
        "surname": "Лебедев",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Вячеслав",
        "surname": "Лямичев",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Назар",
        "surname": "Манаев",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Алина",
        "surname": "Матушкина",
        "sex": "female",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Никита",
        "surname": "Обиход",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Михаил",
        "surname": "Орешкин",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Ярослав",
        "surname": "Почивалин",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Далер",
        "surname": "Рахимов",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Илья",
        "surname": "Смирнов",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Анастасия",
        "surname": "Старкова",
        "sex": "female",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Павел",
        "surname": "Усачёв",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Иван",
        "surname": "Фоменко",
        "sex": "male",
        "plat": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },

      
      {
        "name": "Аким",
        "surname": "Агеев",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Максим",
        "surname": "Акимов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Матвей",
        "surname": "Акимов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Захар",
        "surname": "Баукин",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Артём",
        "surname": "Блинов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Андрей",
        "surname": "Бражаев",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Власов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Егор",
        "surname": "Вырыпаев",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Александр",
        "surname": "Егоров",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Владимир",
        "surname": "Егоров",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Алексей",
        "surname": "Ермаков",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Екатерина",
        "surname": "Ирдеменева",
        "sex": "female",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Александр",
        "surname": "Кириллов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Алекскандр",
        "surname": "Коншин",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Николай",
        "surname": "Майоров",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Матвей",
        "surname": "Мартынов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Роман",
        "surname": "Никишин",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Валентина",
        "surname": "Рамазанова",
        "sex": "female",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Степанов",
        "sex": "male",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Амалия",
        "surname": "Хадиева",
        "sex": "female",
        "plat": 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      

      
      {
        "name": "Богдан",
        "surname": "Агеев",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Владислав",
        "surname": "Аксенов",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Виктория",
        "surname": "Блинова",
        "sex": "female",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Васильев",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Виктория",
        "surname": "Глущенко",
        "sex": "female",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Данила",
        "surname": "Ерёмин",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Татьяна",
        "surname": "Ерёмина",
        "sex": "female",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Казаков",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Ангелина",
        "surname": "Лесовская",
        "sex": "female",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Вячеслав",
        "surname": "Лисин",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Ян",
        "surname": "Маврин",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Нуйкин",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Константин",
        "surname": "Пашков",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Степан",
        "surname": "Поселянов",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Иван",
        "surname": "Посталов",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Михаил",
        "surname": "Походов",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Вадим",
        "surname": "Савельев",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Анастасия",
        "surname": "Скляренко",
        "sex": "female",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Никита",
        "surname": "Стариков",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Руслан",
        "surname": "Строкин",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Денис",
        "surname": "Татаринцев",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Семён",
        "surname": "Фирсов",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Даниил",
        "surname": "Шальков",
        "sex": "male",
        "plat": 4,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },


      
      {
        "name": "Тимур",
        "surname": "Алманиязов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Илья",
        "surname": "Гриднев",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Данила",
        "surname": "Золотарёв",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Михаил",
        "surname": "Казачков",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Богдан",
        "surname": "Кириченко",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Михаил",
        "surname": "Климов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Данил",
        "surname": "Ковтун",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Степан",
        "surname": "Козиков",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Вера",
        "surname": "Круглова",
        "sex": "female",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Полина",
        "surname": "Лукьянова",
        "sex": "female",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Елизавета",
        "surname": "Попова",
        "sex": "female",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Тимур",
        "surname": "Рахимов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Кирилл",
        "surname": "Родин",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Матвей",
        "surname": "Родионов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Степан",
        "surname": "Родионов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Руслан",
        "surname": "Соков",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Иван",
        "surname": "Фокин",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Матвей",
        "surname": "Фролов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Денис",
        "surname": "Черницов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Богдан",
        "surname": "Шашков",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "name": "Николай",
        "surname": "Шляхов",
        "sex": "male",
        "plat": 5,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
      
      
      
    ]);
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('Member', null, {});     
  }
};
