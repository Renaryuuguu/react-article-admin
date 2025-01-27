export const delay = (successRate: number, ms: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.random() * 100
      if (num <= successRate) {
        console.log('Promise调用成功！')
        resolve(true)
      } else {
        console.log('Promise调用失败！')
        reject(new Error('Promise调用失败了！'))
      }
    }, ms)
  })
}