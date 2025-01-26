import { useEffect, useRef, useState, type FC } from 'react'
type CountDownProps = {
  value: number
  prefix?: string
  suffix?: string
  onFinish?: () => void
}
const CountDown: FC<CountDownProps> = ({ value, prefix, suffix, onFinish }) => {
  const [count, setCount] = useState(value)
  const timerRef = useRef<NodeJS.Timeout>()
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerRef.current)
      onFinish && onFinish()
    }
  }, [count])
  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  )
}

export default CountDown
