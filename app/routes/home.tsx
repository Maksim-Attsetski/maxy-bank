import React from 'react';
import type { Route } from './+types/home';
import { Accordion, Appear, Card, Flex } from 'app/shared';
import { motion } from 'framer-motion';
import { useFaq } from 'app/entities/info';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Maxy Bank' }, { name: 'description', content: 'Добро пожаловать в Maxy Bank' }];
}

interface IQuestionList {
  isNumList?: boolean;
  title: string;
  items: string[];
}

interface IQuestion {
  title: string;
  description: string;
  list: IQuestionList[];
}

// const questions: IQuestion[] = [
//   {
//     title: 'Какие продукты и услуги банка доступны для онлайн оформления?',
//     description: `Многие продукты и услуги нашего банка доступны для онлайн оформления через интернет-банкинг
//         и мобильное приложение. Вот основные возможности:`,
//     list: [
//       {
//         title: 'Открытие вкладов/депозитов',
//         items: [
//           `Открытие вкладов/депозитов: вы можете открыть различные виды вкладов в режиме онлайн:
//             отзывные и безотзывные вклады, валютные депозиты.`,
//         ],
//       },
//       {
//         title: 'Оформление кредитов',
//         items: [
//           `Оформление кредитов: доступно онлайн-оформление потребительских кредитов наличными и на
//             любые цели, кредитных карточек с льготными периодом и карт рассрочки.`,
//         ],
//       },
//       {
//         title: 'Оформление Пакетов решений и подключение пакетных расширений:',
//         items: [
//           'дебетовых карт: бесплатных, зарплатных, в разной валюте.',
//           'кредитных карт: с льготным периодом, с выгодной рассрочкой.',
//           'цифровых карт для онлайн-покупок.',
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Какие данные нужны для регистрации клиента и удаленной идентификации?',
//     description: `для регистрации в качестве клиента банка и прохождения удаленной идентификации необходимо предоставить следующие данные:`,
//     list: [
//       {
//         isNumList: true,
//         title: 'Персональные данные:',
//         items: [
//           'ФИО',
//           'Дата и место рождения',
//           'Гражданство',
//           'Реквизиты документа, удостоверяющего личность (паспорт или другой документ)',
//         ],
//       },
//       {
//         isNumList: true,
//         title: 'Персональные данные:',
//         items: ['Контактные данные:', 'Номер мобильного телефона', 'Адрес электронной почты'],
//       },
//       {
//         isNumList: true,
//         title: 'Данные о месте регистрации/проживания:',
//         items: [
//           'Адрес регистрации по месту жительства',
//           'Номер мобильного телефона',
//           'Фактический адрес проживания (если отличается от адреса регистрации).',
//         ],
//       },
//     ],
//   },
// ];

export default function Home() {
  const { faq } = useFaq(true);
  return (
    <div className="container">
      <br />
      <Appear>
        <h2>
          Добро пожаловать в{' '}
          <span className="bg-primary py-1 px-3 text-text rounded-2xl">Maxy Bank</span>
        </h2>
      </Appear>
      <br />
      <Accordion childrenKey={'qau'} title={'Часто задаваемые вопросы'}>
        {faq.map(({ questions, description, title }) => (
          <>
            <Accordion withoutBg childrenKey={title} title={title} key={title}>
              <p className="font-medium mb-2">{description}</p>
              <Flex className="flex-col items-start">
                {questions.map((item, inx) => (
                  <React.Fragment key={item.title}>
                    <p className="font-medium">
                      {item?.isNumList && <span className="text-primary">{inx + 1}. </span>}
                      {item.title}
                    </p>
                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delayChildren: 0.1, staggerChildren: 0.5 }}
                    >
                      {item.items.map((text) => (
                        <motion.li key={text}>
                          <span className="text-primary w-4 h-0.5 rounded-xl bg-primary inline-block my-1"></span>{' '}
                          {text}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </React.Fragment>
                ))}
              </Flex>
            </Accordion>
            <br />
          </>
        ))}
      </Accordion>
    </div>
  );
}
