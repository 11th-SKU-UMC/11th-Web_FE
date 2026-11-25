import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { movies,getMovie } from '../../../lib/movies';
import MovieCard from '../../../components/movie-card';
import FavoriteButton from '../../../components/favorite-button';
type Props={params:Promise<{id:string}>};
export function generateStaticParams(){return movies.map(m=>({id:String(m.id)}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const movie=getMovie(Number((await params).id));return movie?{title:movie.title,description:movie.overview}:{title:'영화 없음'};}
export default async function Detail({params}:Props){const movie=getMovie(Number((await params).id));if(!movie)notFound();return <><MovieCard movie={movie}/><p>{movie.overview}</p><FavoriteButton id={movie.id}/></>}
