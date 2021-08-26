import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 0
    }
  }

  componentDidUpdate() {

    console.log('Updating')
  }

  countDown = () => {
    const interval = setInterval(() => {
      if (this.state.count > 0) {
        this.setState(prevState => ({
          count: prevState.count - 1
        }))
      } else {
        clearInterval(interval)
      }

    }, 1000)
  }


async fetchPokemon() {
  let min = Math.ceil(1);
  let max = Math.floor(152);
  let pokeNum = Math.floor(Math.random() * (max - min) + min);
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
    method: 'GET'
  })
  let json = await res.json()
  console.log(json)
      this.setState({
        pokeInfo: json,
        pokeSprite: json.sprites.front_default,
        pokeName: json.species.name,
        count: 3,
      })
      this.countDown()
    
}

render() {
  if (this.state.count != 0) {
    return (
      <div className={'wrapper'}>
        <button className={'start'}
          onClick={() => { this.fetchPokemon() }}>Start!</button>
        <h1 className={'timer'} >{this.state.count}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeShadow'} src={this.state.pokeSprite} />
        </div>
      </div>
    )
  }
  else {
    return (
      <div className={'wrapper'}>
        <button className={'start'}
          onClick={() => { this.fetchPokemon() }}>Start!</button>
        <h1 className={'timer'} >{this.state.count}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImage'} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}
}

export default PokeFetch;