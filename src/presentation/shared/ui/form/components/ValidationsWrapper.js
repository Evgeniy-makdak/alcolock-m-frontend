import {cloneElement} from "react";
import './ValidationsWrapper.sass'
const ValidationsWrapper = ({children, validationMsgs = [], isShowValidMsg = true}) => {
  const styledChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child, i) => {
        return (
          cloneElement(child, {
            key: i,
            className: `${child.props.className ?? ''}${validationMsgs.length ? ' error-input' : ''}`
          })
        )
      })
    } else {
      return (
        cloneElement(children, {
          className: `${children.props.className ?? ''}${validationMsgs.length ? ' error-input' : ''}`
        })
      )
    }
  }

  return (
    <>
      {styledChildren()}

      {isShowValidMsg &&
        <div className={'validation-messages'}>
          {validationMsgs.map((msg, i) => {
            return <span key={i} className={'validation-messages__msg'}>{msg}</span>
          })}
        </div>
      }
    </>
  )
}

export default ValidationsWrapper
