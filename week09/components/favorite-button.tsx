'use client';
import {useEffect,useState} from 'react';
export default function FavoriteButton({id}:{id:number}){const [saved,setSaved]=useState(false);useEffect(()=>{setSaved(localStorage.getItem(`favorite:${id}`)==='true');},[id]);function toggle(){const next=!saved;localStorage.setItem(`favorite:${id}`,String(next));setSaved(next);}return <button onClick={toggle}>{saved?'즐겨찾기 해제':'즐겨찾기 등록'}</button>}
