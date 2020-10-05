const form = document.querySelector('.formInput');
const questionInput = document.querySelector('.question-input');
const answerInput = document.querySelector('.answer-input');
const addCard = document.querySelector('#addBtn');
const container = document.querySelector('.inner-container');
const clearCards = document.querySelector('.clearBtn');
const card = document.querySelector('.row');
const edit = document.querySelector('.entry');

//Create Card ID using date;

//Card Generator Class
class Card {
  constructor(question,answer,id){
    this.question = question;
    this.answer = answer;
    this.cardID = id;
  }
}

class UI {
  static BuiltCard(card,index){
    const div = document.querySelector('.row');
    div.innerHTML += `
    <div id=${card.cardID} class="col-md-4 entry mb-1 col-lg-4 ">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title text-center">
                ${card.question}?
              </h5>
              <div id="accordianId"  role="tablist" aria-multiselectable="true">
                <div class="card bg-danger">
                  <div class="card-header" role="tab" id="section${index}HeaderId">
                    <h6 class="mb-0 ">
                      <a 
                      class="text-light"
                      data-toggle="collapse" data-parent="#accordianId" href="#section${index}ContentId" aria-expanded="true" aria-controls="section1ContentId">
                        Hide/Show Answer
                      </a>
                    </h6>
                  </div>
                  <div id="section${index}ContentId" class="collapse in" role="tabpanel" aria-labelledby="section${index}HeaderId">
                    <div class="card-body text-light shadow">
                      ${card.answer}
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="btn-group mt-2" role="group" aria-label="Button group">
                <button class='btn btn-primary edit'>Edit</button>
                <button class="btn btn-danger delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static populateUI(){
    if(localStorage.getItem('cards')!==null){
      let storedCards = JSON.parse(localStorage.getItem('cards'));
      storedCards.map((card,index) => UI.BuiltCard(card,index))
    }

  }
  
  static removeCard(el){
    if(el.classList.contains('delete')){
      const card = el.parentElement.parentElement.parentElement.parentElement;
      let storedCards = JSON.parse(localStorage.getItem('cards'));
      let cardId = card.id;
      let removedEntry = storedCards.filter(storedCard => storedCard.cardID != cardId);
      
      localStorage.setItem('cards',JSON.stringify(removedEntry));

      card.remove();
    }
  }

  static editCardContent(el){
    
  }
}

//Local Storage Class
class Storage {
  static uploadCard(newCard){
    let cardArray;
    localStorage.getItem('cards')!==null
    ? cardArray=JSON.parse(localStorage.getItem('cards'))
    : cardArray=[];
    cardArray.push(newCard);
    localStorage.setItem('cards',JSON.stringify(cardArray));
  }

  static clearStorage(){
    localStorage.removeItem('cards');
    document.querySelectorAll('.entry').forEach(eachCard => {
      eachCard.remove();
    })
  }

}
// Storage.clearStorage()

//Listen for the submit event
form.addEventListener('submit', e => {
  e.preventDefault();
  let cardID = () => Date.now();
  
  let newCard = new Card(questionInput.value,answerInput.value,cardID());

  UI.BuiltCard(newCard);

  Storage.uploadCard(newCard);
  
});

//All Event Listeners
//Clear all cards;
clearCards.addEventListener('click', _ => {
  Storage.clearStorage();
});

//Deleting a single Element;
card.addEventListener('click', e => {
  UI.removeCard(e.target);
});

//Editing an entry;
edit.addEventListener('click', e => {
  UI.editCardContent(e.target)
})


document.addEventListener('DOMContentLoaded',UI.populateUI)
