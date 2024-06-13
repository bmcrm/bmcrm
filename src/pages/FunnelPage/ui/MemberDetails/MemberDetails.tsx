import { memo } from 'react';
import { IconSize } from 'shared/ui/Icon/Icon.types';

import Icon from 'shared/ui/Icon/Icon';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';
import mockImage from 'images/avatars/photoMock.png';
import styles from './MemberDetails.module.scss';
// import { ICamper } from 'entities/Camper/model/types/camper.types.ts';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import Loader from 'shared/ui/Loader/Loader';

interface Props {
  camperEmail: string | null;
}

export const MemberDetails = memo(({ camperEmail }: Props) => {
  // const [camper, setCamper] = useState<ICamper | null>(null);
  const { isLoading } = useCampers();

  console.log(camperEmail);

  // useEffect(() => {
  //   getCamperById(camperEmail).then(data => setCamper(data));
  // }, [camperEmail, getCamperById]);

  return (
    <article className={styles.wrapper}>
      <section className={styles.firstBlock}>
        <picture>
          <img src={mockImage} alt='photoMock' />
        </picture>
        <div className={styles.firstBlock__infoWrapper}>
          <div className={styles.firstBlock__info}>
            <h2>
              name
            </h2>
            <div>
              <div className={styles.firstBlock__socials}>
                <Icon icon={<X />} size={IconSize.SIZE_24} />
                <Icon icon={<Facebook />} size={IconSize.SIZE_24} />
                <Icon icon={<Instagram />} size={IconSize.SIZE_24} />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.firstBlock__location}>
              <p>Miami, FL, US</p>
              <p>Added: 01.01.2020</p>
            </div>
            <div className={styles.firstBlock__location}>
              <p>BMs: 2022, 2023</p>
              <p>Updated: 01.01.2020</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.summaryBlock}>
        <h2>Summary</h2>
        <div className={styles.separator} />
        {isLoading && <Loader />}
        {/*<p>{camper?.summary}</p>*/}
      </section>
      <section className={styles.historyBlock}>
        <h2>History</h2>
        <div className={styles.separator} />
        <ul>
          {isLoading && <Loader />}

          {/*{camper?.history?.map((item, index) => (*/}
          {/*  <li key={index}>*/}
          {/*    <span>{item.year}</span>*/}
          {/*    <p>{item.text}</p>*/}
          {/*  </li>*/}
          {/*))}*/}
        </ul>
      </section>
    </article>
  );
});
