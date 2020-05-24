import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NOW_PLAYING_MOVIE = gql`
	{
		nowPlaying {
			id
			title
			vote_average
			poster_path
		}
	}
`
const CardContainer = styled.div`
	img {
		width: 400px;
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

const Card = ({ id, poster_path, backdrop_path, title, average }) => (
	<CardContainer>
		<Link to={`/movies/${id}`}>
			<img src={poster_path} alt={title} />
			<p>{title}</p>
			<p>{average}</p>
		</Link>
	</CardContainer>
)

export default () => {
	const { loading, data } = useQuery(NOW_PLAYING_MOVIE)
	if (loading) {
		return 'loading...'
	}
	console.log(data && data.nowPlaying)
	if (data && data.nowPlaying) {
		return (
			<CardBox>
				{data.nowPlaying.map((movie) => (
					<Card
						key={movie.id}
						id={movie.id}
						title={movie.title}
						average={movie.vote_average}
						poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						backdrop_path={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
					/>
				))}
			</CardBox>
		)
	}
}
