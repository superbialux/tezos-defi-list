import React, { useContext, useEffect } from 'react'
import { PriceContext } from '../context/PriceContext'

export const Main = () => {
  const { tokens, fetchPrices, sort, setSort } = useContext(PriceContext)

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrices()
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices])

  return (
    <div className="container px-4">
      <div className="flex flex-row justify-between">
        {
          [
            {
              key: 'symbol',
              label: 'Token',
            },
            {
              key: 'currentPrice',
              label: 'Price',
            },
            {
              key: 'change',
              label: 'Change',
            },
          ].map(t => (
            <div key={t.key} className="flex flex-1">
              <button
                className="font-bold text-blue-400"
                onClick={() => setSort({
                  key: t.key,
                  type: sort.key !== t.key ? 'desc' : sort.type === 'asc' ? 'desc' : 'asc'
                })}>
                {t.label}
              </button>
              {sort.key === t.key ? <div>{sort.type === 'desc' ? '\\' : `/`}</div> : null}
            </div>
          ))
        }

        <div className="flex flex-1 flex-row justify-center" />
      </div>
      {
        tokens.map((token) => (
          <div className="flex flex-row justify-between">
            <div className="flex flex-1">
              {token.symbol}
            </div>
            <div className="flex flex-1">
              {token.currentPrice} tez
            </div>
            <div className="flex flex-1">
              {token.change}%
            </div>
            <div className="flex flex-1 flex-row justify-center">
              <a className="mr-2 underline text-blue-400" target="_blank" rel="noreferrer" href={`https://quipuswap.com/swap?from=${token.tokenAddress}_${token.tokenId}&to=tez`}>buy</a>
              <a className="underline text-red-400" target="_blank" rel="noreferrer" href={`https://quipuswap.com/swap?from=tez&to=${token.tokenAddress}_${token.tokenId}`}>sell</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}