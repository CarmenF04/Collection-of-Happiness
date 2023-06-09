class Api{
    url = "";
    data = null;

    constructor(newURL){
        this.url = newURL;
    }

   async getData(){
        await fetch(this.url)
            .then(function(response){
                return response.json();
            }).then((data) => {
                this.data = data.episodes;
            });

        return this.data;
    }
}

/////////////


class header{
    placeToRenderHeader;
    headerElement;
    listElement;
    titleElement;
    
    constructor(placeToRenderHeader){
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "collection";
    
        this.listElement = document.createElement("ul");
        this.listElement.classList = "collection__list";
        
        this.titleElement = document.createElement("li");
        this.titleElement.classList = "collection__listItem--second";
        this.titleElement.innerText = "Collection of Happiness";
        
        this.logolistElement = document.createElement("li");
        this.logolistElement.classList = "collection__listItem--first";
    }
    
    render(){
        this.headerElement.appendChild(this.listElement);
        this.listElement.appendChild(this.titleElement);
    
        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}    

/////////////

class main{
    leftside;
    rightside;
    placeToRenderMain

    constructor(placeToRenderMain,data){

        this.placeToRenderMain = document.getElementsByTagName(placeToRenderMain)[0];

        this.mainElement = document.createElement("main");
        this.mainElement.classList = "collection__main";

        this.rightside = new rightside(this.mainElement,data);

        this.leftside = new leftside(this.mainElement, this.rightside);
    }

    makeCardsFromData(data){
        this.leftside.makeCardsFromData(data);
    }

    render(){
        this.placeToRenderMain.appendChild(this.mainElement);
        this.leftside.render();
        this.rightside.render();
    }
}

//////////////

class leftside{
    mainElement;
    rightside;

    constructor(mainElement, rightside){

        this.articleElement = document.createElement("article");
        this.articleElement.classList = "collection__article";

        this.mainElement = mainElement;
        this.rightside = rightside;
        this.leftsectionElement = document.createElement("section");
        this.leftsectionElement.classList = "collection__sectionleft";

        this.cardsElement = document.createElement("ul");
        this.cardsElement.classList = "collection__cards";


        
    }

    //////

    makeCardsFromData(data){
        this.cardsElement.innerHTML = "";
        console.log(data);
        for(let i = 0; i < 4; i ++){
            const random = Math.floor(Math.random() * data.length);
    
            this.cardElement = document.createElement("li");
            this.cardElement.classList = "collection__card";
    
            this.cardTitle = document.createElement("p");
            this.cardTitle.classList = "collection__p--titel";
            this.cardTitle.innerText = data[random].title;
    
            this.cardData = document.createElement("p");
            this.cardData.classList = "collection__p--datum";
            this.cardData.innerText = data[random].date;
    
            this.cardImg = document.createElement("img");
            this.cardImg.classList = "episode__preview";
            this.cardImg.src = data[random].img;

            this.rightside.changeData(data[random]);
    
            this.cardElement.onclick = () => {
                console.log(data);
                this.rightpanel.changeData(data[random]);
            }
    
            this.cardsElement.appendChild(this.cardElement);
            this.cardElement.appendChild(this.cardTitle);
            this.cardElement.appendChild(this.cardData);
            this.cardElement.appendChild(this.cardImg);
        }
    }
    

    render(){
        this.mainElement.appendChild(this.leftsectionElement);
        this.leftsectionElement.appendChild(this.cardsElement);
    }
}

//////////////

class rightside{
    mainElement;
    leftside;

    constructor(mainElement, data){
        this.mainElement = mainElement;
        this.data = data;

        this.rightsection = document.createElement("section");
        this.rightsection.classList = "collection__sectionright";

        this.rightArticle = document.createElement("article");
        this.rightArticle.classList = "collection__episode";

        this.rightFigure = document.createElement("figure");
        this.rightFigure.classList = "collection__figure";

        this.rightP = document.createElement("p");
        this.rightP.classList = "collection__p--titel";

        this.rightDate = document.createElement("p");
        this.rightDate.classList = "collection__p--datum";
        
        this.rightImage = document.createElement("img");
        this.rightImage.classList = "episode__preview";

        this.rightsum = document.createElement("p");
        this.rightsum.classList = "collection__paragraph";

        this.wrapper = document.createElement("div");
        this.wrapper.classList = "collection__wrapper";

        this.source = document.createElement("a");
        this.source.classList = "collection__source";
        this.src = data.url;
        this.source.src = this.source;

        this.audio = document.createElement("audio");
        this.audio.controls = true;
        this.src = data.audio;
        this.audio.src = this.src;
    }

    changeData(data){
        console.log(data);
        this.rightP.innerText = data.title;
        this.rightImage.src = data.img;
        this.rightDate.innerText = data.date;
        this.rightsum.innerText = data.summary;
        this.audio.innerText = "audio";
        this.source.innerText = "source";
        this.audio.src = data.audio;
        this.source.href = data.source;

        this.source.onclick = () => {
            console.log(data);
            this.source = window.open(data.url);
        }
    }

    render(){
        this.mainElement.appendChild(this.rightsection);
        this.rightsection.appendChild(this.rightArticle);
        this.rightArticle.appendChild(this.rightFigure);
        this.rightArticle.appendChild(this.rightsum);
        this.rightArticle.appendChild(this.wrapper);
        this.rightFigure.appendChild(this.rightP);
        this.rightFigure.appendChild(this.rightDate);
        this.rightFigure.appendChild(this.rightImage);
        this.wrapper.appendChild(this.audio);
        this.wrapper.appendChild(this.source);
    }
}

////////////////


class footer{
    footerElement;
    footerPElement;
    placeToRenderFooter;

    constructor(placeToRenderFooter){
        this.placeToRenderFooter = document.getElementsByTagName(placeToRenderFooter)[0];

        this.footerElement = document.createElement("footer");
        this.footerElement.classList = "footer";

        
        this.footerPElement = document.createElement("p");
        this.footerPElement.classList = "footer__p";
        this.footerPElement.innerText = "Gemaakt door Carmen Faas SD2D"
    }

    render(){
        this.footerElement.appendChild(this.footerPElement);

        this.placeToRenderFooter.appendChild(this.footerElement);
    }
}

/////////////////

class App{
    header;
    footer;
    main;

    constructor(){
        this.header = new header("body");
        this.footer = new footer("body");

        this.Api = new Api("./data/data.json");
        this.Api
            .getData().then( (data) => {
                this.main = new main("body",data);

                this.main.makeCardsFromData(data);
                this.header.render();
                this.main.render();
                this.footer.render();
            });

        

    }
}

///////////

const app = new App();