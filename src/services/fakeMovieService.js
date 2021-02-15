

const movies = [
    {
        id:'1',
        title:'Terminator',
        numberInStock:6,
        genre:'Fighting',
        dailyRentalRate: 2.5,
        publishData: '2020-01-03T19:04:2.809Z',
        liked:true
    },
    {
        id:'2',
        title:'Die Hard',
        numberInStock:5,
        genre:'Horror',
        dailyRentalRate: 2.5
    },
    {
        id:'3',
        title:'Get Out',
        numberInStock:8,
        genre:'Funny',
        dailyRentalRate: 3.5
    },
    {
        id:'4',
        title:'Trip to Italy',
        numberInStock:8,
        genre:'Comedy',
        dailyRentalRate: 2.5
    },
    {
        id:'5',
        title:'Airplane',
        numberInStock:7,
        genre:'Comedy',
        dailyRentalRate: 2.5
    },
    {
        id:'6',
        title:'Gone Girl',
        numberInStock:10,
        genre:'Thriller',
        dailyRentalRate: 4.5
    },
    {
        id:'7',
        title:'The Sixth Sense',
        numberInStock:4,
        genre:'Thriller',
        dailyRentalRate: 3.5
    },
    {
        id:'8',
        title:'The Avengers',
        numberInStock:7,
        genre:'Action',
        dailyRentalRate: 3.5
    },
    {
        id:'9',
        title:'Thor',
        numberInStock:7.5,
        genre:'Action',
        dailyRentalRate: 4.5
    }
]

export function getMovies(){
    return movies;
}

export function getMovie(_id){
    return movies.find(m => m.id === _id);
}
