import {movies} from '../../lib/movies';
import MovieCard from '../../components/movie-card';
export default function Movies(){return <><h1>영화 목록</h1><div className="grid">{movies.map(movie=><MovieCard key={movie.id} movie={movie}/>)}</div></>}
