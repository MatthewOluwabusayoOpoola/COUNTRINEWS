news = {
    fetchCountry: function(country){
        fetch('https://restcountries.com/v3.1/name/'+country)
        .then((response) => response.json())
        .then((data)=> this.getCountry(data))
    },
    getCountry: function(data){
        country = data[0].cca2
        this.fetchNews(country)
    },
    options :{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2e4a41ccd9msha832536495a1ee6p165355jsn772989719466',
            'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
        }
    },
    fetchNews: function(country){
        fetch('https://newsapi.org/v2/top-headlines?country=ng&sortBy=popularity&apiKey=41170dee3c6a47ee89248457d24bf26a')
        .then((response)=>response.json())
        .then((data)=>this.displayNews(data))

    },
    displayNews: function (data){
        for(let i = 0; i < data.totalResults; i++){
            const { url, title, description, urlToImage, publishedAt } = data.articles[i]
            const {  name } = data.articles[i].source

            console.log( name, url, title, description, urlToImage, publishedAt, data.totalResults)
            document.getElementById("article").innerHTML += `
            <div  class="col-md-6" data-aos="fade">
            <article class="blog-post">
                <div class="post-slider slider-sm rounded">
                    <img loading="lazy" decoding="async" src="${urlToImage}" alt="Post Thumbnail">
                </div>
                <div class="pt-4">
                    <p class="mb-3">${publishedAt}</p>
                    <h2 class="h4"><a class="text-black" target="_blank" href="${url}">${title}</a></h2>
                    <p>${description}</p> <a target="_blank" href="${url}" class="text-primary fw-bold" aria-label="Read the full article by clicking here">Read More</a>
                </div>
            </article>
            </div>

            `
            document.getElementById("tags").innerHTML += `
                <li class="list-inline-item"><a target="_blank" href="${url}">${name}</a></li>
            `
        }
    },
    searchCountry : function (){
        
        let country = document.querySelector("#search-bar").value
        // location.reload(country);
        this.fetchCountry(country)
        
    }

}

document.getElementById("search-icon").addEventListener('click', function(){
    news.searchCountry();
})

document.getElementById("search-bar").addEventListener('keyup', function(event){
    if(event.key == "Enter"){
        news.searchCountry();
    }
})
news.fetchNews('ng')


