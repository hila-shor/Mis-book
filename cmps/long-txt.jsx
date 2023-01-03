const { useState } = React

export function LongTxt({txt, length}){

  const [isShowMore, setShowMore]= useState(false)

  function getTxt(txt, length){
    return (txt.length <length || isShowMore )? txt : txt.substring(0, length + 1) + '...'
  }

  function onToggleLongTxt() {
    setShowMore(prevIsShowMore => !prevIsShowMore)
}
  return <article className="long-txt">
            <p>{getTxt(txt, length)}</p>
            {txt.length > length && <button onClick={onToggleLongTxt}>
              {isShowMore ? 'Read less': 'Read more'}</button>}           
          </article>

}