import React from 'react'

function Error({children, ...props}) {
  return (
    <div className='text-xs text-center'>{children}</div>
  )
}

export default Error