import { IconSize } from 'shared/ui/Icon/IconTypes';
import { UserInformation } from '../FunnelCard/FunnelCard';

import Icon from 'shared/ui/Icon/Icon';
import X from 'icons/x_icon.svg';
import Facebook from 'icons/fb_icon.svg';
import Instagram from 'icons/inst_icon.svg';
import mockImage from 'images/avatars/photoMock.png';
import styles from './MemberDetails.module.scss';
interface Props {
  userDetails: UserInformation | null;
}
export const MemberDetails = ({ userDetails }: Props) => {
  return (
    <article className={styles.wrapper}>
      <section className={styles.firstBlock}>
        <picture>
          <img src={mockImage} alt='photoMock' />
        </picture>
        <div className={styles.firstBlock__infoWrapper}>
          <div className={styles.firstBlock__info}>
            <h2>{userDetails?.name}</h2>
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
        <p>
          Real Estate Agent in FL. Beloved wife of Alex Roman. Occasionally DJing. Passionate about interior design.
          Good leadership skills and communication. Responsible and gets shit done.
        </p>
      </section>
      <section className={styles.historyBlock}>
        <h2>History</h2>
        <div className={styles.separator} />
        <ul>
          <li>
            <span>2024</span>
            <p>
              Planning to build their own camp Hakuna Matata with the Miami Group. Need WAP anyways. Sync Up in April.
            </p>
          </li>
          <li>
            <span>2023</span>
            <p>
              Came as a Crew with WAP. Helped with the lounge, kitchen, and the art. Organized the ambient lights and
              shit. Voulonteered. Camp fee paid in full in April. Brought food, water, drinks. Stayed in an RV with Alex
              Roman. Part of the Miami Group.
            </p>
          </li>
          <li>
            <span>2022</span>
            <p>Stayed with differen camp</p>
          </li>
        </ul>
      </section>
    </article>
  );
};
