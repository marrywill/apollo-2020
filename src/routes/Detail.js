import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'

const DETAIL_MOVIE = gql`
	query detailMovie($id: Int!) {
		detailMovie(id: $id) {
			id
			title
			vote_average
			poster_path
			overview
			backdrop_path
		}
	}
`
const SIMILAR_MOVIE = gql`
	query similar($id: Int!) {
		similar(id: $id) {
			id
			title
			poster_path
			vote_average
			backdrop_path
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
const DetailContainer = styled.div``

const Card = ({ id, poster_path, backdrop_path, title }) => (
	<CardContainer>
		<Link to={`/movies/${id}`}>
			<img src={poster_path} alt={title} />
			<p>{title}</p>
		</Link>
	</CardContainer>
)

export default () => {
	const { id } = useParams()
	const { loading, data } = useQuery(DETAIL_MOVIE, {
		variables: { id: parseInt(id) },
	})
	const { loading: sloading, data: sdata } = useQuery(SIMILAR_MOVIE, {
		variables: { id: parseInt(id) },
	})
	if (loading || sloading) {
		return 'loading...'
	}

	console.log(data && data.detailMovie)
	if (data && data.detailMovie) {
		if (sdata && sdata.similar) {
			return (
				<div className='detail'>
					<DetailContainer>
						<h1>{data.detailMovie.title}</h1>
						<img
							src={`https://image.tmdb.org/t/p/w500${data.detailMovie.poster_path}`}
							alt={data.detailMovie.title}
						/>
						<p>{data.detailMovie.overview}</p>
					</DetailContainer>
					<CardBox>
						{sdata.similar.map((movie) => (
							<Card
								key={movie.id}
								id={movie.id}
								title={movie.title}
								poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								backdrop_path={
									movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : ''
								}
							/>
						))}
					</CardBox>
				</div>
			)
		}
	}
}
