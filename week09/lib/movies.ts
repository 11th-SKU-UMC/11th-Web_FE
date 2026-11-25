export type Movie = {id: number; title: string; overview: string; poster_path: string};
export const movies: Movie[] = [
 {id:550,title:'Fight Club',overview:'일상에 지친 남자가 새로운 세계를 만나는 이야기.',poster_path:'/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'},
 {id:157336,title:'Interstellar',overview:'인류의 미래를 찾아 우주로 떠나는 탐험.',poster_path:'/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'},
 {id:27205,title:'Inception',overview:'꿈속에서 펼쳐지는 특별한 작전.',poster_path:'/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'}
];
export const getMovie = (id: number) => movies.find(m => m.id === id);
