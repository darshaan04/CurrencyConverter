let apikey="e7b76f3bfab2a45c4f069681"
let api=`https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;
let dropdowns = document.querySelectorAll(".dropdown select");
for(let select of dropdowns)
{
    for (let country in countryList)
    {
        let opt=document.createElement("option");
        opt.innerText=country;
        if(select.name==="from" && country==="USD")
        {
            opt.selected="selected";
        }
        else if(select.name==="to" && country==="INR")
        {
            opt.selected="selected";
        }
        select.append(opt);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}
function updateFlag(e){
    let currcode=e.value;
    let currency=countryList[currcode];
    let newurl=`https://flagsapi.com/${currency}/flat/64.png`;
    let image=e.parentElement.querySelector("img");
    image.src=newurl;
}
let btn=document.querySelector("button");
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let fromcurr=document.getElementById("frdr").value;
    let tocurr=document.getElementById("trdr").value;
    var amount=document.querySelector(".main input");
    var money=parseFloat(amount.value);
    if(isNaN(money) || money<0){
        money=1;
    }
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                let fromExchangeRate = data.conversion_rates[fromcurr];
                let toExchangeRate = data.conversion_rates[tocurr];
                const convertedAmount = (money / fromExchangeRate) * toExchangeRate;
                result.innerHTML = `${money} ${fromcurr} = ${convertedAmount.toFixed(2)} ${tocurr}`;
            });
});