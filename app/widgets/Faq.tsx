import React, { type FC, memo } from 'react';
import { motion } from 'framer-motion';

import { useFaq } from 'app/entities/info';
import { Accordion } from 'app/shared';

const Faq: FC = () => {
  const { faq } = useFaq(true);

  return (
    <Accordion childrenKey={'qau'} title={'Часто задаваемые вопросы'}>
      {faq.map(({ questions, description, title }) => (
        <>
          <Accordion withoutBg childrenKey={title} title={title} key={title}>
            <p className="font-medium mb-2">{description}</p>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.25 },
                },
              }}
              initial="hidden"
              animate="show"
              className="flex gap-3 flex-col items-start"
            >
              {questions.map((item, inx) => (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  key={item.title}
                >
                  <p className="font-medium">
                    {item?.isNumList && <span className="text-primary">{inx + 1}. </span>}
                    {item.title}
                  </p>
                  <ul>
                    {item.items.map((text) => (
                      <li key={text}>
                        <span className="text-primary w-4 h-0.5 rounded-xl bg-primary inline-block my-1"></span>{' '}
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </Accordion>
          <br />
        </>
      ))}
    </Accordion>
  );
};

export default Faq;
