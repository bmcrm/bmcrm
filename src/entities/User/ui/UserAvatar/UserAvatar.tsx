import styles from './UserAvatar.module.scss'
import { useCallback, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import Avatar from 'shared/ui/Avatar/Avatar'
import UserAvatarTooltip from '../UserAvatarTooltip/UserAvatarTooltip'

const STATIC_DATA = {
  alt: 'Alex Roman',
  src: './src/shared/assets/images/avatars/Alex Roman.png',
}

type UserAvatarProps = {
  className?: string
}

const UserAvatar = ({ className }: UserAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const mouseEnterHandler = () => {
    setIsHovered(true)
  }

  const mouseLeaveHandler = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div
      className={classNames(styles.userAvatar, {}, [className])}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <h2 className={styles.userAvatar__name}>Alex Roman</h2>
      <Avatar size={40} alt={STATIC_DATA.alt} src={STATIC_DATA.src} />
      {isHovered && <UserAvatarTooltip onClick={mouseLeaveHandler} />}
    </div>
  )
}

export default UserAvatar
