import { IconSize } from 'shared/ui/Icon/IconTypes';
import Icon from 'shared/ui/Icon/Icon';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';
import mockImage from 'images/avatars/photoMock.png';
import styles from './MemberDetails.module.scss';
import { useEffect, useState } from 'react';
import { ICamper } from 'entities/Camper/model/type';
import useCampers from 'entities/Camper/model/services/useCampers/useCampers';
import Loader from 'shared/ui/Loader/Loader';

interface Props {
  camperId: string;
}

export const MemberDetails = ({ camperId }: Props) => {
  const [camper, setCamper] = useState<ICamper | null>(null);
  const { getCamperById, isLoading } = useCampers(state => ({
    getCamperById: state.getCamperById,
    isLoading: state.isLoading,
  }));
  useEffect(() => {
    getCamperById(camperId).then(data => setCamper(data));
  }, [camperId, getCamperById]);
  return (
    <article className={styles.wrapper}>
      <section className={styles.firstBlock}>
        <picture>
          <img src={mockImage} alt='photoMock' />
        </picture>
        <div className={styles.firstBlock__infoWrapper}>
          <div className={styles.firstBlock__info}>
            <h2>
              {camper?.firstName} {camper?.lastName}
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
        <p>{camper?.summary}</p>
      </section>
      <section className={styles.historyBlock}>
        <h2>History</h2>
        <div className={styles.separator} />
        <ul>
          {isLoading && <Loader />}

          {camper?.history.map((item, index) => (
            <li key={index}>
              <span>{item.year}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
