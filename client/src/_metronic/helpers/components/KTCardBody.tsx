import clsx from 'clsx'
import React, {FC} from 'react'

type Props = {
    className?: string
    scroll?: boolean
    height?: number
    children?: React.ReactNode
    style?: React.CSSProperties
}

const KTCardBody: FC<Props> = (props) => {
    const {className, scroll, height, children, style} = props
    return (
        <div
            className={clsx(
                'card-body',
                className && className,
                {
                    'card-scroll': scroll,
                },
                height && `h-${height}px`
            )}
            style={style}
        >
            {children}
        </div>
    )
}

export {KTCardBody}
