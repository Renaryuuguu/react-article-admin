import type { FC } from 'react'
import { useLoaderData } from 'react-router-dom'

const IndexOrder: FC<{ index: number }> = ({ index }) => {
  const loaderData = useLoaderData() as { queryParam: ArticleListQuery } | null
  console.log(loaderData)
  return (
    loaderData &&
    (loaderData.queryParam.pagenum - 1) * loaderData.queryParam.pagesize +
      index +
      1
  )
}

export default IndexOrder
