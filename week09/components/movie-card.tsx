import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '../lib/movies';
export default function MovieCard({movie}:{movie:Movie}) {return <Link className="movie" href={`/movies/${movie.id}`}><Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={300} height={450} sizes="(max-width: 600px) 45vw, 240px"/><h2>{movie.title}</h2></Link>}
