import placeholderUser from '@img/placeholder-user.png'
import { ComponentPropsWithoutRef, type FC, useEffect, useState } from 'react'

interface BlockAvatarProps extends ComponentPropsWithoutRef<'img'> {
  url: string | null
  size: number
}

const BlockAvatar: FC<BlockAvatarProps> = ({ url, size, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [source, setSource] = useState('')

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => {
          if (res.status === 200) {
            setSource(res.url)
            setLoading(false)
          }
        })
        .catch(() => null)
    }
  }, [url])

  if (loading) {
    props.alt = 'user avatar placeholder'
    return (
      <>
        <img {...props} src={placeholderUser} height={size} width={size} />
      </>
    )
  } else {
    return (
      <>
        <img {...props} src={source} height={size} width={size} />
      </>
    )
  }
}

export { BlockAvatar }
