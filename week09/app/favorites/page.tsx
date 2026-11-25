'use client';
import {useEffect,useState} from 'react';
import {movies} from '../../lib/movies';
import MovieCard from '../../components/movie-card';
export default function Favorites(){const [ids,setIds]=useState<number[]>([]);useEffect(()=>{setIds(movies.filter(m=>localStorage.getItem(`favorite:${m.id}`)==='true').map(m=>m.id));},[]);return <><h1>즐겨찾기 (로컬 예제)</h1><div className="grid">{movies.filter(m=>ids.includes(m.id)).map(m=><MovieCard key={m.id} movie={m}/>)}</div>{!ids.length&&<p>등록된 영화가 없습니다.</p>}</>}
