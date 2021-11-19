import React, { createContext, Component } from 'react'
import axios from 'axios'

export const PriceContext = createContext()

class PriceContextProvider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tokens: [],

      sort: {
        key: 'change',
        type: 'asc'
      },
      setSort: ({ key, type }) => {
        this.setState({tokens: this.state.tokens.sort((a, b) => type === 'asc' ? b[key] - a[key] : a[key] - b[key])})
        this.setState({ sort: {key, type} })
      },

      fetchPrices: async () => {
        try {
          const { data } = await axios.get(`https://api.teztools.io/token/prices`)

          const tokens = data.contracts.filter((con) => con.currentPrice > 0).map((con) => {
            let change = 0
            if (con.currentPrice > 0 && con.lastPrice > 0) {
              change = (con.currentPrice - con.lastPrice) / con.lastPrice
            } else {
              change = 0
            }
            return {
              ...con,
              currentPrice: con.currentPrice.toFixed(12),
              change: (change * 100).toFixed(2)
            }
          })
          tokens.sort((a, b) => this.state.sort.type === 'asc' ? b[this.state.sort.key] - a[this.state.sort.key] : a[this.state.sort.key] - b[this.state.sort.key])
          this.setState({ tokens })
          return tokens
        } catch (err) {
          console.log('Error!', err)
        }
      },
    }
  }

  render() {
    return (
      <PriceContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </PriceContext.Provider>
    )
  }
}

export default PriceContextProvider