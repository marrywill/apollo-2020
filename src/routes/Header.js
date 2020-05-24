import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default () => (
	<nav>
		<NavLink to={{ pathname: '/' }}>상영중인 영화</NavLink>
		<NavLink to={{ pathname: '/popular' }}>인기있는 영화</NavLink>
		<NavLink to={{ pathname: '/topRated' }}>평점높은 영화</NavLink>
		<NavLink to={{ pathname: '/upComing' }}>개봉예정 영화</NavLink>
	</nav>
)
