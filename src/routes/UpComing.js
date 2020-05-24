import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const UP_COMING_MOVIE = gql`
	{
		upComing {
			id
			title
			vote_average
			poster_path
		}
	}
`
const CardContainer = styled.div`
	img {
		width: 350px;
		height: 100%;
		border-radius: 5px;
	}
`
const CardBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`

const Card = ({ id, poster_path, backdrop_path, title }) => (
	<CardContainer>
		<Link to={`/movies/${id}`}>
			<img src={poster_path} alt={title} />
			<p>{title}</p>
		</Link>
	</CardContainer>
)

export default () => {
	const { loading, data } = useQuery(UP_COMING_MOVIE)
	if (loading) {
		return 'loading...'
	}
	console.log(data && data.upComing)
	if (data && data.upComing) {
		return (
			<CardBox>
				{data.upComing.map((movie) => (
					<Card
						key={movie.id}
						id={movie.id}
						title={movie.title}
						poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						backdrop_path={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					/>
				))}
			</CardBox>
		)
	}
}
