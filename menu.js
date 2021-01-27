const appetizer = document.querySelector('#appetizer');
const soup = document.querySelector('#soup');
const dish = document.querySelector('#dish');
const extras = document.querySelector('#extras');
const drink = document.querySelector("#drink");
const discount =  document.querySelector('#discount');
const ApplyButton = document.querySelector('#applyButton'); 
const alcohol = document.querySelector("#alcohol");
const billOutput = document.querySelector("#cost") ;
const billEntries = document.querySelector(".billEntries");
const checkDiscount = document.querySelector('#checkDiscount');
const errorDiv = document.querySelector('#error');
const MENU_API_URL='https://kitchen-side-app.herokuapp.com/menu';
const SEND_ORDER_API_URL = 'https://kitchen-side-app.herokuapp.com/send-order';
let menuData;
fetch(MENU_API_URL).then((res) => {
    return res.json();
  })
  .then((json) => {
    menuData = JSON.parse(json);
    wholeOrder=menuData;
    wholeOrder = restartOrder();

    createMenu(menuData);
  });
const restartOrder=()=>{
    let newOrder = menuData;

    for(let i =0; i<newOrder.length; i ++)
    {
        newOrder[i].amount=0;
    }
    countBill(); 
    billEntries.innerHTML="";

    return newOrder;
}
let wholeOrder;

appetizer.addEventListener('click', function(){
    appetizerPage.style.display="block"
})

soup.addEventListener('click', function(){
    soupPage.style.display="block"
}) 

dish.addEventListener('click', function(){
    dishPage.style.display = "block"
})

extras.addEventListener('click', function(){
   extrasPage.style.display = "block"
})

drink.addEventListener('click', function(){
    drinkPage.style.display = "block"
})

alcohol.addEventListener('click', function(){
    alcoholPage.style.display = "block"
})

//przyciski powrotu

const backButtonApetizer = document.querySelector('#back')

backButtonApetizer.addEventListener('click', function(){
    appetizerPage.style.display = "none"
})

const backButtonSoup = document.querySelector('#back2')

backButtonSoup.addEventListener('click', function(){
    soupPage.style.display = "none"
})

const backButtonDish = document.querySelector('#back3')

backButtonDish.addEventListener('click', function(){
    dishPage.style.display = "none"
})

const backButtonExtras = document.querySelector('#back4')

backButtonExtras.addEventListener('click', function(){
    extrasPage.style.display = "none"
})

const backButtonDrink = document.querySelector('#back5')

backButtonDrink.addEventListener('click', function(){
    drinkPage.style.display = "none"
})

const backButtonAlcohol = document.querySelector('#back6')

backButtonAlcohol.addEventListener('click', function(){
    alcoholPage.style.display = "none"
})





//rachunek

const findParent = (ele)=>{
    return `${ele.category}Page`
};
const countBill=()=>{
    let sum=0;
    for(let i = 0; i < wholeOrder.length; i ++)
    {
        sum += wholeOrder[i].price*wholeOrder[i].amount;
    }
     finishCost = sum/100
     billOutput.innerText=`Należność: ${finishCost} zł`

    // przyznawanie rabatu
    checkDiscount.addEventListener('click', function(){

    //kod rabatowy "febuary5" -5zł

    if(finishCost>=20 && discount.value == "febuary5")
    {
            const sumAfterDiscount = ((sum/100)-5).toFixed(2)
            billOutput.innerText =`Należność: ` + sumAfterDiscount + " zł"
            checkDiscount.disabled="disabled"
            checkDiscount.backgroundColor="#797979"
            checkDiscount.border="none"
            discount.disabled="disabled"
    }
    else if(discount.value =="febuary5" && finishCost<20)
    {
        errorDiv.innerHTML = `By skorzystać z tego kuponu musisz wydać conajmniej 20 zł`
    }

    //kod rabatowy "bestrestourant" -30zł

    if(finishCost>=100 && discount.value == "bestrestourant")
    {
            const sumAfterDiscount2 = ((sum/100)-30).toFixed(2)
            billOutput.innerText =`Należność: ` + sumAfterDiscount2 + " zł"
            checkDiscount.disabled="disabled"
            checkDiscount.backgroundColor="#797979"
            checkDiscount.border="none"
            discount.disabled="disabled"
    }
    else if(discount.value =="bestrestourant" && finishCost<150)
    {
        errorDiv.innerHTML = `By skorzystać z tego kuponu musisz wydać conajmniej 150 zł`
    }

    //kod rabatowy "valentines15" -15zł

    if(finishCost>=50 && discount.value == "valentines15")
    {
            const sumAfterDiscount3 = ((sum/100)-15).toFixed(2)
            billOutput.innerText =`Należność: ` + sumAfterDiscount3 + " zł"
            checkDiscount.disabled="disabled"
            checkDiscount.backgroundColor="#797979"
            checkDiscount.border="none"
            discount.disabled="disabled"
    }
    else if(discount.value =="valentines15" && finishCost<50)
    {
        errorDiv.innerHTML = `By skorzystać z tego kuponu musisz wydać conajmniej 50 zł`
    }

    // kod rabatowy "rich" -60zł

    if(finishCost>=50 && discount.value == "rich")
    {
            const sumAfterDiscount4 = ((sum/100)-60).toFixed(2)
            billOutput.innerText =`Należność: ` + sumAfterDiscount4 + " zł"
            checkDiscount.disabled="disabled"
            checkDiscount.backgroundColor="#797979"
            checkDiscount.border="none"
            discount.disabled="disabled"
    }
    else if(discount.value =="rich" && rich<300)
    {
        errorDiv.innerHTML = `By skorzystać z tego kuponu musisz wydać conajmniej 300 zł`
    }
    


  
    })

};

//dodawanie dań do zamówienia

const addToOrder = (ele)=>{
    for(let i = 0; i < wholeOrder.length; i++)
    {
        if(ele.name===wholeOrder[i].name)
        {
           
            wholeOrder[i].amount++;
            break;
        }
    }
    billEntries.innerHTML="";
    for(let i = 0; i < wholeOrder.length;i++)
    {
        if(wholeOrder[i].amount>0)
        {
            let newEntry = document.createElement("div");
            newEntry.innerText = `${wholeOrder[i].name} x${wholeOrder[i].amount}`;
            billEntries.appendChild(newEntry);
        }
    }
    countBill();
};

//tworzenie menu

const createMenu = (menuData)=>{
    menuData.forEach(ele => {
       let orderThisBtn = document.createElement("button");
       orderThisBtn.setAttribute("class","orderButton");
       orderThisBtn.innerText=ele.name;
       document.querySelector(`#${findParent(ele)}`).appendChild(orderThisBtn);
       orderThisBtn.addEventListener("click",()=>{addToOrder(ele)});
    });
};
//wysyłanie zamówienia
const sendOrder=()=>{
    
  let readyToSendOrder = wholeOrder.filter(ele => ele.amount >0);
  if(readyToSendOrder.length>0)
  {
  fetch(SEND_ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readyToSendOrder),
    });
 
    wholeOrder=restartOrder(); 
    }
}


ApplyButton.addEventListener("click",()=>{
    sendOrder();
})


const checkboxSlider = document.querySelector('#sliderBox')
checkboxSlider.addEventListener('change', function () {
    if (checkboxSlider.checked) {
        document.querySelector('#container').style.backgroundColor = "#414141"
        document.querySelector('#cost').style.backgroundColor = "#414141"
        document.querySelector('#bill').style.backgroundColor = "#414141"
        document.querySelector('#appetizerPage').style.backgroundColor ="#414141"
        document.querySelector('#soupPage').style.backgroundColor ="#414141"
        document.querySelector('#dishPage').style.backgroundColor ="#414141"
        document.querySelector('#extrasPage').style.backgroundColor ="#414141"
        document.querySelector('#drinkPage').style.backgroundColor ="#414141"
        document.querySelector('#alcoholPage').style.backgroundColor ="#414141"
        document.querySelector('#Apply').style.backgroundColor ="#414141"
        document.querySelector('#NumberAndDiscount').style.backgroundColor ="#414141"
        
    } else {
        document.querySelector('#container').style.backgroundColor = "rgb(228, 228, 228"
        document.querySelector('#cost').style.backgroundColor = "rgb(228, 228, 228"
        document.querySelector('#bill').style.backgroundColor = "rgb(228, 228, 228"
        document.querySelector('#appetizerPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#bill').style.backgroundColor = "rgb(228, 228, 228"
        document.querySelector('#appetizerPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#soupPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#dishPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#extrasPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#drinkPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#alcoholPage').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#Apply').style.backgroundColor ="rgb(228, 228, 228"
        document.querySelector('#NumberAndDiscount').style.backgroundColor ="rgb(228, 228, 228"
    
   
    }
  });


  
  



  